import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { updateStep } from '../../store/onboardingSlice';
import { useDispatch, useSelector } from 'react-redux';

const LanguageProficiencyStep = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('');

  const onboarding = useSelector((state) => state.onboarding);
  const userId = onboarding.userId || localStorage.getItem('userId');
  const selectedLevel = onboarding.proficiencyLevel || null;
  
  // Get language name from localStorage first, fallback to Redux state
  const getSelectedLanguage = () => {
    const storedLanguage = localStorage.getItem('selectedLanguage');
    if (storedLanguage) {
      try {
        // If it's stored as JSON object
        const parsedLanguage = JSON.parse(storedLanguage);
        return parsedLanguage.name || parsedLanguage;
      } catch (e) {
        // If it's stored as plain string
        return storedLanguage;
      }
    }
    // Fallback to Redux state
    return onboarding.selectedLanguage?.name || 'English';
  };
  
  const selectedLanguage = getSelectedLanguage();

  const proficiencyLevels = [
    { id: 'A1', label: 'A1', description: 'Beginner', level: 1 },
    { id: 'A2', label: 'A2', description: 'Elementary', level: 2 },
    { id: 'B1', label: 'B1', description: 'Intermediate', level: 3 },
    { id: 'B2', label: 'B2', description: 'Upper Intermediate', level: 4 },
    { id: 'C1', label: 'C1', description: 'Advanced', level: 5 },
    { id: 'C2', label: 'C2', description: 'Proficient', level: 6 },
  ];

  const levelColors = [
    'bg-orange-100',
    'bg-orange-200',
    'bg-orange-300',
    'bg-orange-400',
    'bg-orange-500',
    'bg-orange-600',
  ];

  const handleLevelSelect = (levelId) => {
    dispatch(updateStep({ proficiencyLevel: levelId }));
    setError('');
  };

  const handleConfirm = async (e) => {
    e.preventDefault();

    if (!selectedLevel) {
      setError('Please select your proficiency level.');
      return;
    }

    if (!userId || userId === "undefined" || userId === "null") {
      setError('User ID not found. Please restart registration.');
      console.error('Missing or invalid userId:', userId);
      return;
    }

    try {
      // Debug logging
      console.log('=== PROFICIENCY SAVE DEBUG ===');
      console.log('User ID:', userId);
      console.log('Selected Level:', selectedLevel);
      console.log('Selected Language:', selectedLanguage);
      console.log('Full Redux State:', onboarding);
      
      const payload = {
        proficiency: selectedLevel,
        language: selectedLanguage, // Include language if needed
        step: 7
      };
      
      console.log('API Payload:', payload);
      console.log('API URL:', `${import.meta.env.VITE_BACKEND_URL}/api/auth/step7/${userId}`);

      // Changed from step6 to step7 to match the actual step
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/auth/step7/${userId}`, payload);
      
      console.log('API Response:', response.data);
      console.log('=== END DEBUG ===');
      
      // Navigate to main app or completion screen
      navigate('/'); 
    } catch (error) {
      console.error('=== API ERROR ===');
      console.error('Error details:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      console.error('=== END ERROR ===');
      
      setError(`Failed to save proficiency: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg p-6 sm:p-8 flex flex-col h-screen">
      {/* Back Navigation */}
      <div className="flex justify-start mb-6">
        <button onClick={() => navigate('/onboarding/language')} aria-label="Go back">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
      </div>

      {/* App Logo */}
      <div className="flex justify-center mb-8">
        <span className="text-4xl font-bold text-yellow-500">LB</span>
      </div>

      {/* Step Title - Show actual language name */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-6">
        What is your level in {selectedLanguage}?
      </h1>

      {/* Step Progress Indicator */}
      <div className="flex justify-center items-center mb-8">
        {[1, 2, 3, 4, 5, 6, 7].map((step) => (
          <React.Fragment key={step}>
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold
                ${step === 7 ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-600'}`}
            >
              {step}
            </div>
            {step < 7 && <div className="w-4 h-0.5 bg-gray-300"></div>}
          </React.Fragment>
        ))}
      </div>

      {/* Proficiency Level Selection */}
      <div className="flex-grow overflow-y-auto space-y-4 pb-4">
        {proficiencyLevels.map((option) => (
          <div
            key={option.id}
            onClick={() => handleLevelSelect(option.id)}
            className={`flex items-center justify-between px-4 py-3 rounded-xl border cursor-pointer transition-all duration-200
              ${
                selectedLevel === option.id
                  ? 'border-orange-400 shadow-md'
                  : 'border-gray-200 bg-white hover:border-gray-100'
              }`}
          >
            <div className="flex items-center space-x-3">
              <span className="min-w-[36px] h-[36px] flex items-center justify-center rounded-full bg-orange-100 text-orange-600 font-semibold text-sm">
                {option.label}
              </span>
              <span className="text-sm font-medium text-gray-700">{option.description}</span>
            </div>

            {/* Visual Indicator Bars */}
            <div className="flex items-center space-x-[3px] ml-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-3 rounded-sm transition-all duration-300 ${
                    i < option.level ? levelColors[i] : 'bg-gray-200'
                  }`}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Confirm Button */}
      <div className="mt-6 mb-4">
        <button
          onClick={handleConfirm}
          disabled={!selectedLevel}
          className={`w-full py-4 text-white font-bold text-lg rounded-xl shadow-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-75
            ${selectedLevel ? 'bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500' : 'bg-gray-300 cursor-not-allowed'}`}
        >
          Finish
        </button>
      </div>
    </div>
  );
};

export default LanguageProficiencyStep;