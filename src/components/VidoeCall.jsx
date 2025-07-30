import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../socket"; // Adjust path if needed

const VideoCall = () => {
  const { targetUserId, userId } = useParams(); // Now getting both from URL
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const [localStream, setLocalStream] = useState(null);
  const [connectionState, setConnectionState] = useState('new');
  const [isCallActive, setIsCallActive] = useState(false);
  
  // Queue for ICE candidates received before remote description
  const iceCandidatesQueue = useRef([]);
  
  const config = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "stun:stun1.l.google.com:19302" }
    ],
  };

  const createPeerConnection = () => {
    const pc = new RTCPeerConnection(config);
    
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        console.log("Sending ICE candidate");
        socket.emit("ice-candidate", {
          targetUserId,
          candidate: event.candidate,
        });
      }
    };

    pc.ontrack = (event) => {
      console.log("Received remote track");
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    pc.onconnectionstatechange = () => {
      console.log("Connection state:", pc.connectionState);
      setConnectionState(pc.connectionState);
      setIsCallActive(pc.connectionState === 'connected');
    };

    return pc;
  };

  const processQueuedIceCandidates = async (pc) => {
    while (iceCandidatesQueue.current.length > 0) {
      const candidate = iceCandidatesQueue.current.shift();
      try {
        await pc.addIceCandidate(new RTCIceCandidate(candidate));
        console.log("Queued ICE candidate added successfully");
      } catch (error) {
        console.error("Error adding queued ICE candidate:", error);
      }
    }
  };

  const setupSocketListeners = (pc) => {
    // Clean up existing listeners first
    socket.off("video-offer");
    socket.off("video-answer");
    socket.off("ice-candidate");

    socket.on("video-offer", async ({ offer, callerId }) => {
      try {
        console.log("Received offer from:", callerId);
        
        // Check signaling state before setting remote description
        if (pc.signalingState !== 'stable') {
          console.log('Peer connection not in stable state, current state:', pc.signalingState);
          return;
        }

        await pc.setRemoteDescription(new RTCSessionDescription(offer));
        
        // Process queued ICE candidates
        await processQueuedIceCandidates(pc);
        
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        
        socket.emit("video-answer", { targetUserId: callerId, answer });
        console.log("Answer sent");
        
      } catch (error) {
        console.error("Error handling offer:", error);
      }
    });

    socket.on("video-answer", async ({ answer }) => {
      try {
        console.log("Received answer");
        
        // Check signaling state before setting remote description
        if (pc.signalingState !== 'have-local-offer') {
          console.log('Cannot set remote answer, current signaling state:', pc.signalingState);
          return;
        }

        await pc.setRemoteDescription(new RTCSessionDescription(answer));
        
        // Process queued ICE candidates
        await processQueuedIceCandidates(pc);
        
        console.log("Answer processed successfully");
        
      } catch (error) {
        console.error("Error handling answer:", error);
      }
    });

    socket.on("ice-candidate", async ({ candidate }) => {
      try {
        console.log("Received ICE candidate");
        
        // Queue ICE candidates if remote description is not set
        if (!pc.remoteDescription) {
          console.log("Queueing ICE candidate (no remote description)");
          iceCandidatesQueue.current.push(candidate);
          return;
        }

        await pc.addIceCandidate(new RTCIceCandidate(candidate));
        console.log("ICE candidate added successfully");
        
      } catch (error) {
        console.error("Error adding ICE candidate:", error);
      }
    });
  };

  useEffect(() => {
    const init = async () => {
      if (!userId) return;

      console.log("My User ID:", userId);
      console.log("Target User ID:", targetUserId);

      try {
        // Join own signaling room
        socket.emit("join-video-room", userId);

        // Get local video stream
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: true 
        });
        
        setLocalStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        // Create peer connection
        const pc = createPeerConnection();
        peerConnectionRef.current = pc;

        // Add local stream tracks
        stream.getTracks().forEach(track => pc.addTrack(track, stream));

        // Setup socket listeners
        setupSocketListeners(pc);

      } catch (error) {
        console.error("Error initializing video call:", error);
      }
    };

    init();

    return () => {
      // Cleanup
      socket.off("video-offer");
      socket.off("video-answer");
      socket.off("ice-candidate");
      
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
      
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
      
      // Clear ICE candidates queue
      iceCandidatesQueue.current = [];
    };
  }, [userId, targetUserId]);

  const handleCall = async () => {
    if (!peerConnectionRef.current) return;

    try {
      const pc = peerConnectionRef.current;
      
      // Check if peer connection is in the right state
      if (pc.signalingState !== 'stable') {
        console.log('Resetting peer connection due to invalid state:', pc.signalingState);
        
        // Close existing connection
        pc.close();
        
        // Create new peer connection
        const newPc = createPeerConnection();
        peerConnectionRef.current = newPc;
        
        // Re-add local stream
        if (localStream) {
          localStream.getTracks().forEach(track => newPc.addTrack(track, localStream));
        }
        
        // Setup listeners for new connection
        setupSocketListeners(newPc);
      }

      // Clear ICE candidates queue
      iceCandidatesQueue.current = [];

      const offer = await peerConnectionRef.current.createOffer();
      await peerConnectionRef.current.setLocalDescription(offer);

      socket.emit("video-offer", {
        targetUserId,
        offer,
        callerId: userId,
      });
      
      console.log("Offer sent");
      
    } catch (error) {
      console.error("Error starting call:", error);
    }
  };

  const handleEndCall = () => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
      setLocalStream(null);
    }
    
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }
    
    setConnectionState('closed');
    setIsCallActive(false);
    
    // Clear ICE candidates queue
    iceCandidatesQueue.current = [];
  };

  const getConnectionStateColor = () => {
    switch (connectionState) {
      case 'connected': return 'text-green-500';
      case 'connecting': return 'text-yellow-500';
      case 'disconnected':
      case 'failed': return 'text-red-500';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <h1 className="text-2xl mb-2">
        {isCallActive ? `Connected with ${targetUserId}` : `Calling ${targetUserId}`}
      </h1>
      
      <div className={`text-sm mb-4 ${getConnectionStateColor()}`}>
        Connection: {connectionState}
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex flex-col items-center">
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="w-64 h-48 border-2 border-green-500 rounded-lg"
          />
          <span className="text-sm mt-2 text-green-400">You</span>
        </div>
        
        <div className="flex flex-col items-center">
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-64 h-48 border-2 border-red-500 rounded-lg bg-gray-800"
          />
          <span className="text-sm mt-2 text-red-400">
            {targetUserId || 'Remote User'}
          </span>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleCall}
          disabled={!peerConnectionRef.current || isCallActive}
          className="px-6 py-2 bg-green-600 rounded hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
        >
          {isCallActive ? 'Call Active' : 'Start Call'}
        </button>
        
        <button
          onClick={handleEndCall}
          className="px-6 py-2 bg-red-600 rounded hover:bg-red-700 transition-colors"
        >
          End Call
        </button>
      </div>
      
      <div className="mt-4 text-xs text-gray-400 max-w-md text-center">
        {connectionState === 'new' && 'Click "Start Call" to begin'}
        {connectionState === 'connecting' && 'Establishing connection...'}
        {connectionState === 'connected' && 'Call is active'}
        {connectionState === 'failed' && 'Connection failed. Try again.'}
      </div>
    </div>
  );
};

export default VideoCall;