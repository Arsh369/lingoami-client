// ProfilePage.jsx
import React from "react";
import {
  ChevronLeft,
  MoreVertical,
  Share2,
  Edit,
  Home,
  Video,
  User,
  MessageSquare,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const navigate = useNavigate();

  // ✅ Get data from Redux store
  const {
    firstName,
    lastName,
    email,
    country,
    countryCode,
    language,
    proficiency,
    userId,
  } = useSelector((state) => state.onboarding);

  const userProfile = {
    name: `${firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()} ${lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase()}`,
    username: email?.split("@")[0] || "unknown_user",
    flag: `https://flagcdn.com/w40/${countryCode?.toLowerCase() || 'al'}.png`,
    profilePic: `https://placehold.co/150x150/FFD700/000000?text=${firstName.charAt(0).toUpperCase() || 'U'}${lastName.charAt(0).toUpperCase() || ''}`,
    friends: 25,
    followers: 25,
    following: 25,
    bio: `Language: ${language}\nProficiency: ${proficiency}\nCountry: ${country}`,
    interests: ["React", "JavaScript", "Web Development", "Design"],
  };

  const nearbyUsers = [
    {
      id: 1,
      name: "Adam Wills",
      country: "🇩🇪",
      profilePic: "https://placehold.co/80x80/FFD700/000000?text=AW",
    },
    {
      id: 2,
      name: "Sarah Connor",
      country: "🇺🇸",
      profilePic: "https://placehold.co/80x80/FF6B6B/FFFFFF?text=SC",
    },
    // ... more users
  ];

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <div className="flex flex-col items-center w-full">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <header className="bg-yellow-400 p-3 sm:p-4 flex items-center justify-between text-black shadow-md">
            <ChevronLeft
              onClick={() => navigate("/")}
              size={40}
              className="cursor-pointer hover:bg-yellow-300 rounded-full p-1 transition-colors sm:size-6"
            />
            <h1 className="text-xl font-semibold">Profile</h1>
            <MoreVertical
              size={40}
              className="cursor-pointer hover:bg-yellow-300 rounded-full p-1 transition-colors sm:size-6"
            />
          </header>

          {/* Profile Section */}
          <div className="relative bg-yellow-400 pb-16 shadow-lg">
            <div className="flex flex-col items-center pt-4 -mb-16">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img
                  src={userProfile.profilePic}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold mt-3 text-black px-4 text-center">
                {userProfile.name} <img src={userProfile.flag} alt="Flag" className="w-6 inline-block mb-2"></img>
              </h2>
              <p className="text-gray-700 text-sm">@{userProfile.username}</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center mt-5">
            <div className="flex gap-6">
              <button className="flex items-center bg-white text-gray-800 px-4 py-2 shadow-md hover:bg-gray-50 rounded border-2 border-yellow-400">
                <Share2 size={16} className="mr-2" />
                Share
              </button>
              <button
                onClick={() => navigate("/edit-profile")}
                className="flex items-center bg-white text-gray-800 px-4 py-2 shadow-md hover:bg-gray-50 rounded border-2 border-yellow-400"
              >
                <Edit size={16} className="mr-2" />
                Edit Profile
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white mt-4 p-4 rounded-xl shadow-md">
            <div className="flex justify-around">
              <div className="text-center">
                <p className="text-2xl font-bold">{userProfile.friends}</p>
                <p className="text-gray-600 text-sm">Friends</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{userProfile.followers}</p>
                <p className="text-gray-600 text-sm">Followers</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{userProfile.following}</p>
                <p className="text-gray-600 text-sm">Following</p>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="bg-white mt-4 p-4 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Bio</h3>
            <p className="text-gray-600 whitespace-pre-line">{userProfile.bio}</p>
          </div>

          {/* Interests */}
          <div className="bg-white mt-4 p-4 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Interests</h3>
            <div className="flex flex-wrap gap-3">
              {userProfile.interests.map((interest, idx) => (
                <span
                  key={idx}
                  className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded text-sm font-medium"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Nearby Users */}
          <div className="bg-white mt-4 p-4 rounded-xl shadow-md mb-24">
            <div className="flex justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Nearby Users
              </h3>
              <span className="text-blue-600 text-sm cursor-pointer hover:underline">
                See All
              </span>
            </div>
            <div className="flex overflow-x-auto space-x-4 pb-2 scrollbar-hide">
              {nearbyUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex-none w-32 bg-gray-50 p-3 rounded-xl text-center shadow"
                >
                  <div className="w-20 h-20 rounded-full overflow-hidden border mb-2 mx-auto">
                    <img
                      src={user.profilePic}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="font-semibold text-sm truncate">{user.name}</p>
                  <p className="text-gray-500 text-xs mb-2">{user.country}</p>
                  <button className="w-full bg-yellow-400 text-black py-1 rounded text-xs hover:bg-yellow-500">
                    Follow
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Nav */}
        <footer className="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-2 flex justify-around items-center shadow z-30">
          <div className="flex flex-col items-center text-gray-500 hover:text-yellow-500 cursor-pointer">
            <Home size={20} />
            <span className="text-xs">Home</span>
          </div>
          <div className="flex flex-col items-center text-gray-500 hover:text-yellow-500 cursor-pointer">
            <Video size={20} />
            <span className="text-xs">Video</span>
          </div>
          <div className="flex flex-col items-center text-gray-500 hover:text-yellow-500 cursor-pointer">
            <MessageSquare size={20} />
            <span className="text-xs">Chats</span>
          </div>
          <div className="flex flex-col items-center text-yellow-500 font-medium">
            <User size={20} />
            <span className="text-xs">Profile</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ProfilePage;
