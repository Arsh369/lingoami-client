import React, { useState } from 'react';
import {useNavigate} from "react-router-dom"
import { ChevronLeft, Moon, Volume2, Globe, Save, Sliders, EyeOff, ChevronRight } from 'lucide-react';

const PreferencesPage = () => {
    const navigate = useNavigate();
  // State for preference toggles
  const [darkMode, setDarkMode] = useState(false);
  const [soundEffects, setSoundEffects] = useState(true);
  const [dataSaving, setDataSaving] = useState(false);
  const [personalizedAds, setPersonalizedAds] = useState(true);

  return (
    <div className="fixed inset-0 bg-gray-100 font-inter flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 flex items-center">
        <button className="cursor-pointer p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300">
          <ChevronLeft 
          onClick={() => navigate("/setting/settingoptions")}
          className="h-6 w-6 text-gray-700" />
        </button>
        <h1 className="text-xl font-semibold text-gray-800 ml-4">Preferences</h1>
      </header>

      <main className="p-4">
        {/* General Preferences Section */}
        <section className="mb-6">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">General</h2>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 last:border-b-0">
              <div className="flex items-center">
                <Moon className="h-5 w-5 text-gray-600 mr-3" />
                <span className="text-gray-800 text-base">Dark Mode</span>
              </div>
              <label htmlFor="darkModeToggle" className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="darkModeToggle"
                  className="sr-only peer"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Sound Effects Toggle */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <Volume2 className="h-5 w-5 text-gray-600 mr-3" />
                <span className="text-gray-800 text-base">Sound Effects</span>
              </div>
              <label htmlFor="soundEffectsToggle" className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="soundEffectsToggle"
                  className="sr-only peer"
                  checked={soundEffects}
                  onChange={() => setSoundEffects(!soundEffects)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </section>

        {/* Content Preferences Section */}
        <section className="mb-6">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Content</h2>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Language Item */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 last:border-b-0 cursor-pointer hover:bg-gray-50">
              <div className="flex items-center">
                <Globe className="h-5 w-5 text-gray-600 mr-3" />
                <span className="text-gray-800 text-base">Language</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-500 text-sm mr-2">English</span> {/* Current language */}
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Data Saving Toggle */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <Save className="h-5 w-5 text-gray-600 mr-3" />
                <span className="text-gray-800 text-base">Data Saving</span>
              </div>
              <label htmlFor="dataSavingToggle" className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="dataSavingToggle"
                  className="sr-only peer"
                  checked={dataSaving}
                  onChange={() => setDataSaving(!dataSaving)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </section>

        {/* Privacy Preferences Section */}
        <section>
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Privacy</h2>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Personalized Ads Toggle */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <EyeOff className="h-5 w-5 text-gray-600 mr-3" />
                <span className="text-gray-800 text-base">Personalized Ads</span>
              </div>
              <label htmlFor="personalizedAdsToggle" className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="personalizedAdsToggle"
                  className="sr-only peer"
                  checked={personalizedAds}
                  onChange={() => setPersonalizedAds(!personalizedAds)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PreferencesPage;
