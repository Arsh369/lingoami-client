import React from "react";
import {
  ChevronLeft,
  MoreVertical,
  Share2,
  Edit,
  Users,
  UserPlus,
  MessageSquare,
  Home,
  Video,
  User,
} from "lucide-react";
import {useNavigate} from "react-router-dom"

const ProfilePage = () => {
    const navigate = useNavigate();
  const userProfile = {
    name: "Anshul Sharma",
    username: "unstableguy07",
    flag: "🇮🇳",
    profilePic: "https://placehold.co/150x150/FFD700/000000?text=AS",
    friends: 25,
    followers: 25,
    following: 25,
    bio: "Aspiring Associate Product Engineer with a background in web development.\nAspiring Associate Product Engineer with a background in web development.",
    interests: [
      "Dancing",
      "Web Development",
      "UI/UX Design",
      "React",
      "JavaScript",
      "Product Management",
      "Technology",
    ],
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
    {
      id: 3,
      name: "Liu Wei",
      country: "🇨🇳",
      profilePic: "https://placehold.co/80x80/4ECDC4/FFFFFF?text=LW",
    },
    {
      id: 4,
      name: "Emma Stone",
      country: "🇬🇧",
      profilePic: "https://placehold.co/80x80/45B7D1/FFFFFF?text=ES",
    },
    {
      id: 5,
      name: "Carlos Silva",
      country: "🇧🇷",
      profilePic: "https://placehold.co/80x80/96CEB4/FFFFFF?text=CS",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Main container - responsive layout */}
      <div className="flex flex-col items-center w-full">
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
          {/* Header */}
          <header className="bg-yellow-400 p-3 sm:p-4 flex items-center justify-between text-black relative z-10 shadow-md">
            <ChevronLeft
              onClick={() => navigate("/")}
              size={40}
              className="cursor-pointer hover:bg-yellow-300 rounded-full p-1 transition-colors sm:size-6"
            />
            <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">
              Profile
            </h1>
            <MoreVertical
              size={40}
              className="cursor-pointer hover:bg-yellow-300 rounded-full p-1 transition-colors sm:size-6"
            />
          </header>

          {/* Profile Section */}
          <div className="relative bg-yellow-400 pb-16 sm:pb-20  shadow-lg">
            <div className="flex flex-col items-center justify-center pt-2 sm:pt-4 -mb-12 sm:-mb-16">
              <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img
                  src={userProfile.profilePic}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/150x150/FFD700/000000?text=AS";
                  }}
                />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mt-3 sm:mt-4 text-black px-4 text-center">
                {userProfile.name}{" "}
                <span className="text-lg sm:text-xl md:text-2xl">
                  {userProfile.flag}
                </span>
              </h2>
              <p className="text-gray-700 text-sm sm:text-base md:text-lg">
                @{userProfile.username}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center relative mt-5">
            <div className="flex gap-6">
              <button className="flex items-center justify-center bg-white text-gray-800 px-4 py-2 shadow-md hover:bg-gray-50 transition-colors text-sm sm:text-base rounded border-2 border-yellow-400">
                <Share2 size={16} className="mr-2" />
                Share
              </button>
              <button className="flex items-center justify-center bg-white text-gray-800 px-4 py-2 shadow-md hover:bg-gray-50 transition-colors text-sm sm:text-base rounded border-2 border-yellow-400">
                <Edit size={16} className="mr-2 " />
                Edit Profile
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-white  sm:mx-4 mt-4 sm:mt-6 p-4 sm:p-5 rounded-xl shadow-md">
            <div className="flex justify-around items-center">
              <div className="text-center">
                <p className="text-xl sm:text-2xl md:text-3xl font-bold">
                  {userProfile.friends}
                </p>
                <p className="text-gray-600 text-xs sm:text-sm md:text-base mt-1">
                  Friends
                </p>
              </div>
              <div className="text-center">
                <p className="text-xl sm:text-2xl md:text-3xl font-bold">
                  {userProfile.followers}
                </p>
                <p className="text-gray-600 text-xs sm:text-sm md:text-base mt-1">
                  Followers
                </p>
              </div>
              <div className="text-center">
                <p className="text-xl sm:text-2xl md:text-3xl font-bold">
                  {userProfile.following}
                </p>
                <p className="text-gray-600 text-xs sm:text-sm md:text-base mt-1">
                  Following
                </p>
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="bg-white sm:mx-4 mt-4 p-4 sm:p-5 rounded-xl shadow-md">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">
              Bio
            </h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {userProfile.bio}
            </p>
          </div>

          {/* Interests Section */}
          <div className="bg-white sm:mx-4 mt-4 p-4 sm:p-5 rounded-xl shadow-md">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">
              Interests
            </h3>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {userProfile.interests.map((interest, index) => (
                <span
                  key={index}
                  className="bg-yellow-200 text-yellow-800 px-3 py-1.5 sm:px-4 sm:py-2 rounded text-xs sm:text-sm md:text-base font-medium"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Nearby Users Section */}
          <div className="bg-white sm:mx-4 mt-4 p-4 sm:p-5 rounded-xl shadow-md mb-20 sm:mb-24">
            <div className="flex justify-between items-center mb-3 sm:mb-4">
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
                Nearby Users
              </h3>
              <span className="text-blue-600 text-xs sm:text-sm md:text-base cursor-pointer hover:underline font-medium">
                See All
              </span>
            </div>
            <div className="flex overflow-x-auto space-x-3 sm:space-x-4 pb-2 scrollbar-hide -mx-1">
              {nearbyUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex-none w-32 sm:w-36 md:w-40 bg-gray-50 p-3 sm:p-4 rounded-xl shadow-sm text-center"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-gray-200 mb-2 sm:mb-3 mx-auto">
                    <img
                      src={user.profilePic}
                      alt={user.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://placehold.co/80x80/FFD700/000000?text=AW";
                      }}
                    />
                  </div>
                  <p className="font-semibold text-gray-800 text-xs sm:text-sm md:text-base truncate mb-1">
                    {user.name}
                  </p>
                  <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3">
                    {user.country}
                  </p>
                  <button className="w-full bg-yellow-400 text-black px-3 py-1.5 sm:px-4 sm:py-2 rounded text-xs sm:text-sm font-medium hover:bg-yellow-500 transition-colors">
                    Follow
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Navigation Bar */}
        <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 sm:py-3 flex justify-around items-center shadow-lg z-30">
          <div className="flex flex-col items-center text-gray-500 hover:text-yellow-500 cursor-pointer p-1 sm:p-2 transition-colors">
            <Home size={20} className="sm:size-6" />
            <span className="text-xs mt-1 sm:text-xs">Home</span>
          </div>
          <div className="flex flex-col items-center text-gray-500 hover:text-yellow-500 cursor-pointer p-1 sm:p-2 transition-colors">
            <Video size={20} className="sm:size-6" />
            <span className="text-xs mt-1 sm:text-xs">Video</span>
          </div>
          <div className="flex flex-col items-center text-gray-500 hover:text-yellow-500 cursor-pointer p-1 sm:p-2 transition-colors">
            <MessageSquare size={20} className="sm:size-6" />
            <span className="text-xs mt-1 sm:text-xs">Chats</span>
          </div>
          <div className="flex flex-col items-center text-yellow-500 cursor-pointer p-1 sm:p-2">
            <User size={20} className="sm:size-6" />
            <span className="text-xs mt-1 sm:text-xs font-medium">Profile</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ProfilePage;
