import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

const LanguageLevelScreen = () => {
  const navigate = useNavigate();
  // Define language levels with their ID, label, description, and a 'level' for visual bars
const levels = [
  { id: 'A1', label: 'A1', description: 'Beginner', level: 1 },
  { id: 'A2', label: 'A2', description: 'Elementary', level: 2 },
  { id: 'B1', label: 'B1', description: 'Intermediate', level: 3 },
  { id: 'B2', label: 'B2', description: 'Upper Intermediate', level: 4 },
  { id: 'C1', label: 'C1', description: 'Advanced', level: 5 },
  { id: 'C2', label: 'C2', description: 'Proficient', level: 6 },
];

const yellowShades = [
  'bg-orange-100',
  'bg-orange-200',
  'bg-orange-300',
  'bg-orange-400',
  'bg-orange-500',
  'bg-orange-600',
];

  const [selectedLevel, setSelectedLevel] = useState(null); // No level selected by default

  const handleLevelSelect = (id) => {
    setSelectedLevel(id);
  };

  const handleConfirm = () => {
    if (selectedLevel) {
      console.log(`Selected language level: ${selectedLevel}`);
      alert(`You have confirmed your level as: ${selectedLevel}`);
      // Here you would typically navigate to the next screen or save the data
    } else {
      alert("Please select your language level to confirm.");
    }
  };

  const handleGoBack = () => {
    console.log("Going back to the previous screen.");
    // Implement navigation logic to go back
    // e.g., navigate(-1) if using react-router-dom's useNavigate hook
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg  p-6 sm:p-8 flex flex-col h-screen">
      {/* Back arrow icon */}
      <div className="flex justify-start mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6 text-gray-700 cursor-pointer"
          aria-label="Go back"
          onClick={() => navigate("/language")}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </div>

      {/* Logo */}
      <div className="flex justify-center mb-8">
        <span className="text-4xl font-bold text-yellow-500">LB</span>
      </div>

      {/* Page Title */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-6">
        What is your level in ___ ? 
      </h1>
            {/* Progress Indicator (Steps 1-2-3-4-5) */}
            <div className="flex justify-center items-center mb-8">
              {[1, 2, 3, 4, 5, 6, 7].map((step) => (
                <React.Fragment key={step}>
                  {/* Circle for each step */}
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold
                      ${
                        step === 7
                          ? "bg-yellow-500 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                  >
                    {step}
                  </div>
                  {/* Separator line between circles, except for the last one */}
                  {step < 7 && <div className="w-4 h-0.5 bg-gray-300"></div>}
                </React.Fragment>
              ))}
            </div>

      {/* Language Level List */}
      <div className="w-full max-w-md flex-grow overflow-y-auto space-y-4 pb-4">
      {levels.map((levelOption) => (
        <div
          key={levelOption.id}
          className={`flex items-center justify-between px-4 py-3 rounded-xl border cursor-pointer transition-all duration-200
            ${selectedLevel === levelOption.id
              ? 'border-orange-400 shadow-md'
              : 'border-gray-200 bg-white hover:border-gray-100'}`}
          onClick={() => handleLevelSelect(levelOption.id)}
        >
          {/* Left: Label and Description */}
          <div className="flex items-center space-x-3">
            <span className="min-w-[36px] h-[36px] flex items-center justify-center rounded-full bg-orange-100 text-orange-600 font-semibold text-sm">
              {levelOption.label}
            </span>
            <span className="text-sm font-medium text-gray-700">
              {levelOption.description}
            </span>
          </div>

          {/* Right: Visual Bars */}
          <div className="flex items-center space-x-[3px] ml-2">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-3 rounded-sm transition-all duration-300 ${
                  i < levelOption.level ? yellowShades[i] : 'bg-gray-200'
                }`}
              ></div>
            ))}
          </div>
        </div>
      ))}
      </div>

      {/* Confirm Button */}
      <div className="w-full max-w-md mt-6 mb-4">
        <button
          onClick={handleConfirm}
          disabled={!selectedLevel} // Disable button if no level is selected
          className={`w-full py-4 text-white font-bold text-lg rounded-xl shadow-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-75
            ${selectedLevel ? 'bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500' : 'bg-gray-300 cursor-not-allowed'}`}
        >
          Finish
        </button>
      </div>
    </div>
  );
};

export default LanguageLevelScreen;
