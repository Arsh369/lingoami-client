import React from "react";
import {
  ChevronLeft,
  Bell,
  Star,
  AlertTriangle,
  HelpCircle,
  FileText,
  Info,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
const SettingOptions = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 bg-gray-100 font-inter flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 flex items-center flex-shrink-0">
        <button className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300">
          <ChevronLeft
            onClick={() => navigate("/")}
            className="h-6 w-6 text-gray-700 cursor-pointer"
          />
        </button>
        <h1 className="text-xl font-semibold text-gray-800 ml-4">Settings</h1>
      </header>

      <main className="flex-1 p-4 overflow-y-auto bg-gray-100">
        {/* Personalization Section */}
        <section className="mb-6">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
            Personalization
          </h2>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Notifications Item */}
            <div
              onClick={() => navigate("/setting/notifications")}
              className="flex items-center justify-between p-4 border-b border-gray-200 last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <Bell className="h-5 w-5 text-gray-600 mr-3" />
                <span className="text-gray-800 text-base">Notifications</span>
              </div>
              <ChevronLeft className="h-5 w-5 text-gray-400 rotate-180" />
            </div>
            {/* Preferences Item */}
            <div 
            onClick={() => navigate("/setting/preferences")}
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-gray-600 mr-3" />
                <span className="text-gray-800 text-base">Preferences</span>
              </div>
              <ChevronLeft className="h-5 w-5 text-gray-400 rotate-180" />
            </div>
          </div>
        </section>

        {/* Help Center Section */}
        <section className="mb-6">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
            Help Center
          </h2>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Report an issue Item */}
            <div 
            onClick={() => navigate("/setting/repostanissue")}
            className="flex items-center justify-between p-4 border-b border-gray-200 last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-gray-600 mr-3" />
                <span className="text-gray-800 text-base">Report an issue</span>
              </div>
              <ChevronLeft className="h-5 w-5 text-gray-400 rotate-180" />
            </div>
            {/* FAQ Item */}
            <div 
            onClick={() => navigate("/setting/faq")}
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <HelpCircle className="h-5 w-5 text-gray-600 mr-3" />
                <span className="text-gray-800 text-base">FAQ</span>
              </div>
              <ChevronLeft className="h-5 w-5 text-gray-400 rotate-180" />
            </div>
          </div>
        </section>

        {/* Privacy Section */}
        <section>
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
            Privacy
          </h2>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Terms and Conditions Item */}
            <div 
            onClick={() => navigate("/setting/termsandconditions")}
            className="flex items-center justify-between p-4 border-b border-gray-200 last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-gray-600 mr-3" />
                <span className="text-gray-800 text-base">
                  Terms and Conditions
                </span>
              </div>
              <ChevronLeft className="h-5 w-5 text-gray-400 rotate-180" />
            </div>
            {/* About Us Item */}
            <div 
            onClick={() => navigate("/setting/aboutus")} className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <Info className="h-5 w-5 text-gray-600 mr-3" />
                <span className="text-gray-800 text-base">About Us</span>
              </div>
              <ChevronLeft className="h-5 w-5 text-gray-400 rotate-180" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SettingOptions;
