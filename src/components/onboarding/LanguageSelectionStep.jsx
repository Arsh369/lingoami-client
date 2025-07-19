import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

// Data for languages with associated flags/icons (simplified for demonstration)
// Using country flags for languages closely tied to a country, otherwise a generic icon
import languages from '../../assets/languages';

// CreateAccountLanguage component for selecting language to learn
function LanguageSelectionStep() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(null);
    const [error, setError] = useState('');

  // Filter languages based on search query
  const filteredLanguages = languages.filter(language =>
    language.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    language.native.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to handle the "Start Learning" button click
  const handleNext = () => {
    if (!selectedLanguage) {
      setError('Please select a country.');
      return;
    }

    // Clear error and proceed
    setError('');
    console.log(`Selected Language: ${selectedLanguage.name}`);
    navigate('/onboarding/language-level');
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
          onClick={() => navigate("/onboarding/location")}
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
        Which language do you want to learn ? 
      </h1>
            {/* Progress Indicator (Steps 1-2-3-4-5) */}
            <div className="flex justify-center items-center mb-8">
              {[1, 2, 3, 4, 5, 6, 7].map((step) => (
                <React.Fragment key={step}>
                  {/* Circle for each step */}
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold
                      ${
                        step === 6
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

      {/* Search Input Field */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {/* Search icon */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </div>
      </div>

      {/* Language List - Scrollable area */}
      <div className="flex-grow overflow-y-auto space-y-3 pr-2 custom-scrollbar">
        {filteredLanguages.length > 0 ? (
          filteredLanguages.map((language) => (
            <div
              key={language.code} // Using language code as key for uniqueness
              className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer
                ${selectedLanguage?.code === language.code
                  ? 'border-yellow-500 bg-yellow-50'
                  : 'border-gray-300 bg-white hover:bg-gray-50'
                }`}
              onClick={() => setSelectedLanguage(language)}
            >
              <div className="flex items-center space-x-3">
                {/* Flag image for language */}
                <img
                  src={language.flag}
                  alt={`${language.name} flag`}
                  className="w-8 h-6 rounded-sm shadow-sm flex-shrink-0"
                  onError={(e) => {
                    e.target.onerror = null; // Prevents infinite loop
                    e.target.src = `https://placehold.co/32x24/F0F0F0/000000?text=${language.code}`; // Fallback placeholder
                  }}
                />
                <span className="text-gray-800 font-medium">{language.name} / {language.native}</span>
              </div>
              {/* Checkmark icon for selected option */}
              {selectedLanguage?.code === language.code && (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 text-yellow-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-4">No languages found.</p>
        )}
      </div>

      {/* Custom Scrollbar Styling (for demonstration) */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
      {/* Error Message */}
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      {/* Next Button */}
      <button
        onClick={handleNext}
        className="w-full bg-yellow-500 text-white font-semibold py-3 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition duration-300 mt-6"
      >
        Next
      </button>
    </div>
  );
}

export default LanguageSelectionStep;