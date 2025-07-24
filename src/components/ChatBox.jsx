// components/ChatBox.jsx
import React, { useEffect, useState } from "react";
import socket from "../socket";
import axios from "axios";

const ChatBox = ({ currentChatUser, userId, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  // 💬 Load chat messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/messages/${userId}/${
            currentChatUser._id
          }`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Failed to load messages:", error);
      }
    };

    if (userId && currentChatUser?._id) {
      fetchMessages();
    }
  }, [userId, currentChatUser]);

  // 📥 Socket: Receive message
  useEffect(() => {
    socket.on("msg-receive", ({ from, message }) => {
      setMessages((prev) => [...prev, { from, message }]);
    });
    return () => socket.off("msg-receive");
  }, []);

  // 📤 Send Message
  const sendMessage = async () => {
    if (!newMsg.trim() || !currentChatUser) return;

    const token = localStorage.getItem("token");

    try {
      const timestamp = new Date().toISOString(); // ✅ 1. Generate timestamp

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
        createdAt: timestamp, // ✅ 2. Send with timestamp
      });

      setMessages((prev) => [
        ...prev,
        {
          from: userId,
          message: newMsg,
          createdAt: timestamp, // ✅ 3. Add here too!
        },
      ]);

      setNewMsg("");
    } catch (error) {
      console.error("Message send error:", error);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  if (!currentChatUser) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-gray-500 p-8">
        <div className="w-64 h-64 bg-gray-100 rounded-full flex items-center justify-center mb-8">
          <span className="text-6xl">💬</span>
        </div>
        <h2 className="text-xl font-semibold mb-2 text-gray-800">
          Welcome to ChatApp
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Select a chat from the sidebar to start messaging
        </p>
      </div>
    );
  }

  const formatDateSeparator = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    }

    if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }

    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center shadow-sm">
        <button
          onClick={onBack}
          className="mr-3 text-gray-600 hover:text-gray-800"
        >
          ←
        </button>
        <div className="relative mr-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-gray-600 font-semibold text-sm">
              {currentChatUser.firstName?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
        <div className="flex-1">
          <h1 className="font-semibold text-gray-800">
            {currentChatUser.firstName} {currentChatUser.lastName}
          </h1>
          <p className="text-green-500 text-sm">Online</p>
        </div>
        <div className="flex space-x-4">
          <button className="text-gray-600 hover:text-gray-800">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1v-3.5l4 4v-11l-4 4z" />
            </svg>
          </button>
          <button className="text-gray-600 hover:text-gray-800">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
          </button>
          <button className="text-gray-600 hover:text-gray-800">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-2"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f5f5f5' fill-opacity='0.3'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20v-40c11.046 0 20 8.954 20 20zM0 20v20h40V0H20c0 11.046-8.954 20-20 20z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        {(() => {
          let lastDate = null;
          return messages.map((msg, i) => {
            const messageDate = msg.createdAt
              ? new Date(msg.createdAt)
              : new Date();
            const formattedDate = formatDateSeparator(messageDate);

            const showDateSeparator = formattedDate !== lastDate;
            lastDate = formattedDate;

            return (
              <React.Fragment key={i}>
                {showDateSeparator && (
                  <div className="text-center py-2">
                    <span className="bg-white px-3 py-1 rounded-full text-xs text-gray-600 shadow-sm">
                      {formattedDate}
                    </span>
                  </div>
                )}
                <div
                  className={`flex ${
                    msg.from === userId ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg shadow-sm ${
                      msg.from === userId
                        ? "bg-orange-400 text-white rounded-br-sm"
                        : "bg-white text-gray-800 rounded-bl-sm"
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                    <div className="flex items-center justify-end mt-1 space-x-1">
                      <span
                        className={`text-xs ${
                          msg.from === userId
                            ? "text-orange-100"
                            : "text-gray-500"
                        }`}
                      >
                        {msg.createdAt
                          ? new Date(msg.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "Just now"}
                      </span>
                      {msg.from === userId && (
                        <span className="text-orange-100 text-xs">✓</span>
                      )}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          });
        })()}
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 p-4 flex items-center space-x-3">
        <button className="text-gray-500 hover:text-gray-700">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
          </svg>
        </button>
        <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2">
          <input
            type="text"
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500"
            placeholder="Type a message"
          />
          <button className="text-gray-500 ml-2 hover:text-gray-700">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          </button>
          <button className="text-gray-500 ml-2 hover:text-gray-700">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10.5 8.5 8 12 5.5 15.5 8zM12 13.5c1.25 0 2.45-.2 3.57-.57.35-.11.74-.03 1.02.24l2.2 2.2c-1.44 2.83-3.76 5.14-6.59 6.59l-2.2-2.2c-.27-.27-.36-.67-.24-1.02.37-1.12.57-2.32.57-3.57H12z" />
            </svg>
          </button>
        </div>
        <button
          onClick={sendMessage}
          className="bg-orange-400 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-orange-500 transition-colors"
        >
          {newMsg.trim() ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
