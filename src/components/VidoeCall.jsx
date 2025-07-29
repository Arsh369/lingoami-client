import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../socket"; // Adjust path if needed

const VideoCall = () => {
  const { targetUserId, userId } = useParams(); // Now getting both from URL
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const [peerConnection, setPeerConnection] = useState(null);
  const [localStream, setLocalStream] = useState(null);

  const config = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
    ],
  };

  useEffect(() => {
    const init = async () => {
      if (!userId) return;

      console.log("My User ID:", userId);
      console.log("Target User ID:", targetUserId);

      // Join own signaling room
      socket.emit("join-video-room", userId);

      // Get local video stream
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      const pc = new RTCPeerConnection(config);
      setPeerConnection(pc);

      stream.getTracks().forEach(track => pc.addTrack(track, stream));

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("ice-candidate", {
            targetUserId,
            candidate: event.candidate,
          });
        }
      };

      pc.ontrack = (event) => {
        console.log("Received remote track");
        if (remoteVideoRef.current && !remoteVideoRef.current.srcObject) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };

      pc.onconnectionstatechange = () => {
        console.log("Connection state:", pc.connectionState);
      };

      // Signaling listeners
      socket.on("video-offer", async ({ offer, callerId }) => {
        console.log("Received offer from:", callerId);
        await pc.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.emit("video-answer", { targetUserId: callerId, answer });
      });

      socket.on("video-answer", async ({ answer }) => {
        console.log("Received answer");
        await pc.setRemoteDescription(new RTCSessionDescription(answer));
      });

      socket.on("ice-candidate", async ({ candidate }) => {
        console.log("Received ICE candidate");
        try {
          await pc.addIceCandidate(new RTCIceCandidate(candidate));
        } catch (err) {
          console.error("Error adding ICE candidate:", err);
        }
      });
    };

    init();

    return () => {
      socket.off("video-offer");
      socket.off("video-answer");
      socket.off("ice-candidate");
      localStream?.getTracks().forEach((track) => track.stop());
      peerConnection?.close();
    };
  }, [userId, targetUserId]);

  const handleCall = async () => {
    if (!peerConnection) return;
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    socket.emit("video-offer", {
      targetUserId,
      offer,
      callerId: userId,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h1 className="text-2xl mb-4">Calling {targetUserId}</h1>
      <div className="flex gap-4">
        <video
          ref={localVideoRef}
          autoPlay
          playsInline
          muted
          className="w-64 h-48 border-2 border-green-500"
        />
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="w-64 h-48 border-2 border-red-500"
        />
      </div>
      <button
        onClick={handleCall}
        className="mt-8 px-6 py-2 bg-blue-600 rounded hover:bg-blue-700"
      >
        Start Call
      </button>
    </div>
  );
};

export default VideoCall;
