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
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  
  // Queue for ICE candidates received before remote description
  const iceCandidatesQueue = useRef([]);
  const callStartTimeRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  
  const config = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "stun:stun1.l.google.com:19302" }
    ],
  };

  // Format call duration
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Update call duration
  useEffect(() => {
    let interval;
    if (isCallActive && callStartTimeRef.current) {
      interval = setInterval(() => {
        const now = Date.now();
        const duration = Math.floor((now - callStartTimeRef.current) / 1000);
        setCallDuration(duration);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCallActive]);

  // Auto-hide controls
  useEffect(() => {
    const resetControlsTimeout = () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      setShowControls(true);
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    };

    if (isCallActive) {
      resetControlsTimeout();
    }

    const handleMouseMove = () => {
      if (isCallActive) {
        resetControlsTimeout();
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isCallActive]);

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
      if (pc.connectionState === 'connected' && !callStartTimeRef.current) {
        callStartTimeRef.current = Date.now();
        setIsCallActive(true);
      } else if (pc.connectionState === 'disconnected' || pc.connectionState === 'failed') {
        setIsCallActive(false);
        callStartTimeRef.current = null;
      }
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
        
        if (pc.signalingState !== 'stable') {
          console.log('Peer connection not in stable state, current state:', pc.signalingState);
          return;
        }

        await pc.setRemoteDescription(new RTCSessionDescription(offer));
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
        
        if (pc.signalingState !== 'have-local-offer') {
          console.log('Cannot set remote answer, current signaling state:', pc.signalingState);
          return;
        }

        await pc.setRemoteDescription(new RTCSessionDescription(answer));
        await processQueuedIceCandidates(pc);
        
        console.log("Answer processed successfully");
        
      } catch (error) {
        console.error("Error handling answer:", error);
      }
    });

    socket.on("ice-candidate", async ({ candidate }) => {
      try {
        console.log("Received ICE candidate");
        
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
        socket.emit("join-video-room", userId);

        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: true 
        });
        
        setLocalStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        const pc = createPeerConnection();
        peerConnectionRef.current = pc;

        stream.getTracks().forEach(track => pc.addTrack(track, stream));
        setupSocketListeners(pc);

      } catch (error) {
        console.error("Error initializing video call:", error);
      }
    };

    init();

    return () => {
      socket.off("video-offer");
      socket.off("video-answer");
      socket.off("ice-candidate");
      
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
      
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
      
      iceCandidatesQueue.current = [];
    };
  }, [userId, targetUserId]);

  const handleCall = async () => {
    if (!peerConnectionRef.current) return;

    try {
      const pc = peerConnectionRef.current;
      
      if (pc.signalingState !== 'stable') {
        console.log('Resetting peer connection due to invalid state:', pc.signalingState);
        
        pc.close();
        const newPc = createPeerConnection();
        peerConnectionRef.current = newPc;
        
        if (localStream) {
          localStream.getTracks().forEach(track => newPc.addTrack(track, localStream));
        }
        
        setupSocketListeners(newPc);
      }

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
    callStartTimeRef.current = null;
    setCallDuration(0);
    iceCandidatesQueue.current = [];
  };

  const toggleMute = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
      }
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOff(!videoTrack.enabled);
      }
    }
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Remote Video - Full Screen */}
      <video
        ref={remoteVideoRef}
        autoPlay
        playsInline
        className="w-full h-full object-cover"
        style={{ transform: 'scaleX(-1)' }} // Mirror effect
      />
      
      {/* No Remote Video Placeholder */}
      {!remoteVideoRef.current?.srcObject && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="text-center text-white">
            <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-xl font-medium">{targetUserId}</p>
            <p className="text-gray-400">{connectionState === 'connecting' ? 'Connecting...' : 'Waiting to connect'}</p>
          </div>
        </div>
      )}

      {/* Top Header */}
      <div className={`absolute top-0 left-0 right-0 z-20 transition-opacity duration-300 ${showControls || !isCallActive ? 'opacity-100' : 'opacity-0'}`}>
        <div className="bg-gradient-to-b from-black/70 to-transparent p-4">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => window.history.back()}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h2 className="text-lg font-medium">{targetUserId}</h2>
                <p className="text-sm text-gray-300">
                  {isCallActive ? formatDuration(callDuration) : connectionState}
                </p>
              </div>
            </div>
            
            {/* Top Local Video Preview */}
            {isCallActive && (
              <div className="w-20 h-28 bg-gray-800 rounded-lg overflow-hidden border border-gray-600">
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                  style={{ transform: 'scaleX(-1)' }}
                />
                {isVideoOff && (
                  <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Local Video - Bottom Right Corner (Main Preview) */}
      {!isCallActive && (
        <div className="absolute bottom-32 right-4 w-32 h-44 bg-gray-800 rounded-xl overflow-hidden border-2 border-white/20 shadow-2xl z-10">
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
            style={{ transform: 'scaleX(-1)' }}
          />
          {isVideoOff && (
            <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
      )}

      {/* Bottom Controls */}
      <div className={`absolute bottom-0 left-0 right-0 z-20 transition-opacity duration-300 ${showControls || !isCallActive ? 'opacity-100' : 'opacity-0'}`}>
        <div className="bg-gradient-to-t from-black/70 to-transparent p-6">
          <div className="flex items-center justify-center space-x-6">
            {/* Mute Button */}
            <button
              onClick={toggleMute}
              className={`p-4 rounded-full transition-all duration-200 ${
                isMuted 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-gray-700/80 hover:bg-gray-600'
              }`}
            >
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                {isMuted ? (
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                ) : (
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.146 6.146a.5.5 0 01.708 0L14 7.293l1.146-1.147a.5.5 0 01.708.708L14.707 8l1.147 1.146a.5.5 0 01-.708.708L14 8.707l-1.146 1.147a.5.5 0 01-.708-.708L13.293 8l-1.147-1.146a.5.5 0 010-.708z" clipRule="evenodd" />
                )}
              </svg>
            </button>

            {/* Video Toggle Button */}
            <button
              onClick={toggleVideo}
              className={`p-4 rounded-full transition-all duration-200 ${
                isVideoOff 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-gray-700/80 hover:bg-gray-600'
              }`}
            >
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                {isVideoOff ? (
                  <path d="M.5 8.5A.5.5 0 011 8h2v3H1a.5.5 0 01-.5-.5v-2zM4 8h6v3H4V8zM11 4a3 3 0 013 3v2a3 3 0 01-3 3H4a3 3 0 01-3-3V7a3 3 0 013-3h7zM15.293 5.293a1 1 0 011.414 0L18 6.586l1.293-1.293a1 1 0 111.414 1.414L19.414 8l1.293 1.293a1 1 0 01-1.414 1.414L18 9.414l-1.293 1.293a1 1 0 01-1.414-1.414L16.586 8l-1.293-1.293a1 1 0 010-1.414z" />
                ) : (
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                )}
              </svg>
            </button>

            {/* Call/End Call Button */}
            {!isCallActive ? (
              <button
                onClick={handleCall}
                disabled={!peerConnectionRef.current}
                className="p-4 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-full transition-all duration-200 shadow-lg"
              >
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </button>
            ) : (
              <button
                onClick={handleEndCall}
                className="p-4 bg-red-500 hover:bg-red-600 rounded-full transition-all duration-200 shadow-lg"
              >
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </button>
            )}

            {/* Switch Camera Button (placeholder) */}
            <button
              className="p-4 bg-gray-700/80 hover:bg-gray-600 rounded-full transition-all duration-200"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;