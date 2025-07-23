// pages/ChatPage.jsx
import React, { useEffect, useState } from "react";
import socket from "../socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";

const ChatPage = () => {
  const { userId: selectedUserId } = useParams(); // ID of user you're chatting with (from URL)
  const userId = useSelector((state) => state.onboarding.userId); // Your logged-in user
  const [currentChatUser, setCurrentChatUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  // Add user to socket
  useEffect(() => {
    if (userId) {
      socket.emit("add-user", userId);
    }
  }, [userId]);

  // Fetch selected chat user from backend
  useEffect(() => {
    const fetchChatUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/users`
        );
        const found = res.data.find((u) => u._id === selectedUserId);
        setCurrentChatUser(found || null);
        console.log("All users:", res.data);
      } catch (err) {
        console.error("Failed to fetch chat user:", err);
      }

      console.log("Trying to match:", selectedUserId);
    };

    if (selectedUserId) {
      fetchChatUser();
    } else{
      console.warn("No selected user id from route")
    }
    console.log("Selected User ID from URL:", selectedUserId);
  }, [selectedUserId]);

  // Socket receive message
  useEffect(() => {
    socket.on("msg-receive", ({ from, message }) => {
      setMessages((prev) => [...prev, { from, message }]);
    });
    return () => socket.off("msg-receive");
  }, []);


    useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/messages/${userId}/${currentChatUser._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessages(response.data); // ← Load all old messages
      } catch (error) {
        console.error("Failed to load messages:", error);
      }
    };

    if (userId && currentChatUser?._id) {
      fetchMessages();
    }
  }, [userId, currentChatUser]);

  // Send message
  const sendMessage = async () => {
    if (!newMsg.trim() || !currentChatUser) return;

    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/messages/send`,
        {
          from: userId,
          to: currentChatUser._id,
          message: newMsg,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      socket.emit("send-msg", {
        from: userId,
        to: currentChatUser._id,
        message: newMsg,
      });

      setMessages((prev) => [...prev, { from: userId, message: newMsg }]);
      setNewMsg("");
    } catch (error) {
      if(error.response){
        console.error("Server responded with error", error.response.data);
      }else{
        console.error("Message send error", error.message);
      }
    }
  };

  if (!currentChatUser) {
    return (
      <div className="p-4">
        <p className="text-gray-500">Loading chat user...</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">
        Chat with {currentChatUser?.firstName}
      </h1>

      <div className="border p-4 h-64 overflow-y-scroll flex flex-col">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 my-1 rounded max-w-[70%] ${
              msg.from === userId
                ? "bg-blue-200 self-end"
                : "bg-gray-200 self-start"
            }`}
          >
            {msg.message}
          </div>
        ))}
      </div>

      <div className="mt-4 flex">
        <input
          type="text"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          className="border p-2 flex-grow"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 ml-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
