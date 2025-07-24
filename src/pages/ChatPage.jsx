// pages/ChatPage.jsx
import React, { useEffect, useState } from "react";
import socket from "../socket";
import { useSelector } from "react-redux";
import axios from "axios";
import ChatBox from "../components/ChatBox";

const ChatPage = () => {
  const userId = useSelector((state) => state.onboarding.userId);
  const [allUsers, setAllUsers] = useState([]);
  const [currentChatUser, setCurrentChatUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // 🧠 Socket: Add user to socket.io
  useEffect(() => {
    if (userId) {
      socket.emit("add-user", userId);
    }
  }, [userId]);

  // 🧑‍🤝‍🧑 Fetch all users except self
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/users`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        const filtered = res.data.filter((u) => u._id !== userId);
        setAllUsers(filtered);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };

    if (userId) fetchUsers();
  }, [userId]);

  // Filter users based on search
  const filteredUsers = allUsers.filter((user) =>
    `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Left Sidebar - Chat List */}
      <div
        className={`w-full md:w-96 border-r border-gray-200 flex flex-col ${
          currentChatUser ? "hidden md:flex" : "flex"
        }`}
      >
        {/* Header */}
        <div className="bg-white p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">dL8h</span>
              </div>
            </div>
            <button className="text-gray-600 hover:text-gray-800">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>

          {/* Active Friends */}
          <div className="mb-4">
            <p className="text-gray-800 font-semibold text-sm mb-3">
              Active Friends
            </p>
            <div className="flex space-x-3">
              {filteredUsers.slice(0, 4).map((user) => (
                <div key={user._id} className="flex flex-col items-center">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-semibold text-sm">
                        {user.firstName?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <span className="text-xs text-gray-600 mt-1 truncate w-16 text-center">
                    {user.firstName}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <svg
              className="absolute left-3 top-2.5 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 py-2 flex items-center justify-between">
            <h2 className="font-semibold text-gray-800">All Chats</h2>
            <button className="text-gray-400 text-sm flex items-center space-x-1">
              <span>Filter</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"
                />
              </svg>
            </button>
          </div>

          {filteredUsers.map((user) => (
            <div
              key={user._id}
              className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 ${
                currentChatUser?._id === user._id ? "bg-orange-50" : ""
              }`}
              onClick={() => setCurrentChatUser(user)}
            >
              <div className="relative mr-3">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-semibold">
                    {user.firstName?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-gray-800 truncate">
                    {user.firstName} {user.lastName}
                  </p>
                  <span className="text-xs text-gray-400">20m</span>
                </div>
                <p className="text-sm text-gray-500 truncate">
                  Vitae lacus sagittis cursus a morbi...
                </p>
              </div>
              <div className="ml-2">
                <div className="w-5 h-5 bg-orange-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="border-t border-gray-200 p-2">
          <div className="flex justify-around">
            <button className="flex flex-col items-center py-2 px-4 text-gray-800">
              <svg
                className="w-6 h-6 mb-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
              <span className="text-xs">Home</span>
            </button>
            <button className="flex flex-col items-center py-2 px-4 text-gray-400">
              <svg
                className="w-6 h-6 mb-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1v-3.5l4 4v-11l-4 4z" />
              </svg>
              <span className="text-xs">Video</span>
            </button>
            <button className="flex flex-col items-center py-2 px-4 text-orange-400">
              <svg
                className="w-6 h-6 mb-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
              </svg>
              <span className="text-xs">Chats</span>
            </button>
            <button className="flex flex-col items-center py-2 px-4 text-gray-400">
              <svg
                className="w-6 h-6 mb-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <span className="text-xs">Profile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Side - Chat Window */}
      <div className={`flex-1 ${currentChatUser ? "flex" : "hidden md:flex"}`}>
        <ChatBox
          currentChatUser={currentChatUser}
          userId={userId}
          onBack={() => setCurrentChatUser(null)}
        />
      </div>
    </div>
  );
};

export default ChatPage;
