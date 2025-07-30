import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../socket";

const VideoCall = () => {
  const { targetUserId, userId } = useParams();
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
  const iceCandidatesQueue = useRef([]);
  const callStartTimeRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  const config = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "stun:stun1.l.google.com:19302" }
    ],
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

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

  useEffect(() => {
    const resetControlsTimeout = () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
      setShowControls(true);
      controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 3000);
    };

    if (isCallActive) resetControlsTimeout();

    const handleMouseMove = () => {
      if (isCallActive) resetControlsTimeout();
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [isCallActive]);

  const createPeerConnection = () => {
    const pc = new RTCPeerConnection(config);

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", {
          targetUserId,
          candidate: event.candidate,
        });
      }
    };

    pc.ontrack = (event) => {
      const [remoteStream] = event.streams;
      if (remoteVideoRef.current && remoteStream) {
        remoteVideoRef.current.srcObject = remoteStream;
        remoteVideoRef.current.play().catch(err => console.error("Playback error:", err));
      }
    };

    pc.onconnectionstatechange = () => {
      setConnectionState(pc.connectionState);
      if (pc.connectionState === 'connected' && !callStartTimeRef.current) {
        callStartTimeRef.current = Date.now();
        setIsCallActive(true);
      } else if (['disconnected', 'failed', 'closed'].includes(pc.connectionState)) {
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
      } catch (error) {
        console.error("Error adding queued ICE candidate:", error);
      }
    }
  };

  const setupSocketListeners = (pc) => {
    socket.off("video-offer");
    socket.off("video-answer");
    socket.off("ice-candidate");

    socket.on("video-offer", async ({ offer, callerId }) => {
      try {
        await pc.setRemoteDescription(new RTCSessionDescription(offer));
        await processQueuedIceCandidates(pc);

        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);

        socket.emit("video-answer", { targetUserId: callerId, answer });
      } catch (error) {
        console.error("Error handling offer:", error);
      }
    });

    socket.on("video-answer", async ({ answer }) => {
      try {
        await pc.setRemoteDescription(new RTCSessionDescription(answer));
        await processQueuedIceCandidates(pc);

        const remoteStream = new MediaStream();
        pc.getReceivers().forEach(receiver => {
          if (receiver.track) remoteStream.addTrack(receiver.track);
        });

        if (remoteVideoRef.current && remoteStream) {
          remoteVideoRef.current.srcObject = remoteStream;
          remoteVideoRef.current.play().catch(err => console.error("Playback error:", err));
        }
      } catch (error) {
        console.error("Error handling answer:", error);
      }
    });

    socket.on("ice-candidate", async ({ candidate }) => {
      try {
        if (!pc.remoteDescription) {
          iceCandidatesQueue.current.push(candidate);
          return;
        }
        await pc.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (error) {
        console.error("Error adding ICE candidate:", error);
      }
    });
  };

  useEffect(() => {
    const init = async () => {
      if (!userId) return;
      try {
        socket.emit("join-video-room", userId);

        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });

        setLocalStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
          localVideoRef.current.muted = true;
          localVideoRef.current.play().catch(err => console.error("Local playback error:", err));
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
        localStream.getTracks().forEach(track => track.stop());
      }

      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }

      iceCandidatesQueue.current = [];
    };
  }, [userId, targetUserId]);

  const handleCall = async () => {
    const pc = peerConnectionRef.current;
    if (!pc || pc.signalingState !== 'stable') return;

    try {
      iceCandidatesQueue.current = [];
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      socket.emit("video-offer", {
        targetUserId,
        offer,
        callerId: userId,
      });
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
      <video
        ref={remoteVideoRef}
        autoPlay
        playsInline
        className="w-full h-full object-cover"
        style={{ transform: 'scaleX(-1)' }}
      />
      {!remoteVideoRef.current?.srcObject && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white">
          <p className="text-xl">{connectionState === 'connecting' ? 'Connecting...' : 'Waiting...'}</p>
        </div>
      )}
      <div className={`absolute top-0 left-0 right-0 p-4 transition-opacity ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center justify-between text-white">
          <h2 className="text-lg font-bold">{targetUserId}</h2>
          <p>{isCallActive ? formatDuration(callDuration) : connectionState}</p>
        </div>
      </div>
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
          <div className="absolute inset-0 bg-gray-800 flex items-center justify-center text-gray-300">Video Off</div>
        )}
      </div>
      <div className={`absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent transition-opacity ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex justify-center space-x-6">
          <button onClick={toggleMute} className={`p-4 rounded-full ${isMuted ? 'bg-red-500' : 'bg-gray-700/80'} text-white`}>
            {isMuted ? 'Unmute' : 'Mute'}
          </button>
          <button onClick={toggleVideo} className={`p-4 rounded-full ${isVideoOff ? 'bg-red-500' : 'bg-gray-700/80'} text-white`}>
            {isVideoOff ? 'Video On' : 'Video Off'}
          </button>
          {!isCallActive ? (
            <button onClick={handleCall} className="p-4 bg-green-500 text-white rounded-full">Call</button>
          ) : (
            <button onClick={handleEndCall} className="p-4 bg-red-500 text-white rounded-full">End</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
