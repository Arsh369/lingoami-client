import React from 'react';
import { useState, useEffect} from 'react';

const Home = () => {

  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Fetch from localStorage (or from Redux, or API)
    const name = localStorage.getItem('firstName');
    setUserName(name || 'User'); // fallback to 'User' if not found
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col font-inter">
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between p-4 bg-white shadow-sm">
        <div className="flex items-center space-x-2">
          {/* Placeholder for dLBb logo/icon */}
          <span className="text-2xl font-bold text-yellow-500">LB</span>
        </div>
        {/* Settings Icon */}
        <button className="text-gray-600 focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.57-.346 1.15-.653 1.724-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-start p-6 text-center">
        {/* Welcome Message */}
        <h1 className="text-2xl font-semibold mt-4 mb-8">Welcome, {userName}</h1>

        {/* Active Users Section */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="flex -space-x-4">
            {/* User Profile Images (placeholders) */}
            <img
              className="w-12 h-12 rounded-full border-2 border-white object-cover"
              src="https://placehold.co/48x48/F7B731/FFFFFF?text=User1"
              alt="User 1"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/48x48/F7B731/FFFFFF?text=User1"; }}
            />
            <img
              className="w-12 h-12 rounded-full border-2 border-white object-cover"
              src="https://placehold.co/48x48/F7B731/FFFFFF?text=User2"
              alt="User 2"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/48x48/F7B731/FFFFFF?text=User2"; }}
            />
            <img
              className="w-12 h-12 rounded-full border-2 border-white object-cover"
              src="https://placehold.co/48x48/F7B731/FFFFFF?text=User3"
              alt="User 3"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/48x48/F7B731/FFFFFF?text=User3"; }}
            />
            <div className="w-12 h-12 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-sm font-semibold text-gray-700">
              +10
            </div>
          </div>
          <p className="ml-4 text-gray-600 text-sm">10+ Others are active now</p>
        </div>

        {/* Tagline */}
        <p className="text-xl text-gray-800 mb-12 px-4">
          Learn your favorite language with native speakers
        </p>

        {/* Start Chatting Button */}
        <button className="flex items-center justify-center px-8 py-3 bg-yellow-500 text-white font-bold text-lg rounded-full shadow-lg hover:bg-yellow-600 transition duration-300 ease-in-out">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          Start Chatting
        </button>
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="flex justify-around items-center p-4 bg-white border-t border-gray-200">
        <div className="flex flex-col items-center text-yellow-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span className="text-xs mt-1">Home</span>
        </div>
        <div className="flex flex-col items-center text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          <span className="text-xs mt-1">Video</span>
        </div>
        <div className="flex flex-col items-center text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
          <span className="text-xs mt-1">Chats</span>
        </div>
        <div className="flex flex-col items-center text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span className="text-xs mt-1">Profile</span>
        </div>
      </nav>
    </div>
  );
};

export default Home;
