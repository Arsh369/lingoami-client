import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
// Main App component that will render our account creation step
// CreateAccountGender component for the second step of account creation
function GenderSelectionScreen() {
  const navigate = useNavigate();
  // State to hold the selected gender
  const [selectedGender, setSelectedGender] = useState('');

  // Function to handle the "Confirm" button click
  const handleConfirm = () => {
    // In a real application, you would send this data and navigate to the next step
    console.log('Selected Gender:', selectedGender);
    navigate('/date');
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg p-6 sm:p-8">
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
          onClick={() => navigate('/')}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </div>

      {/* Logo */}
      <div className="flex justify-center mb-8">
        <span className="text-4xl font-bold text-yellow-500">LB</span>
      </div>

      {/* Page Title */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-6">
        Create your Account
      </h1>

      {/* Progress Indicator (Steps 1-2-3-4-5) */}
      <div className="flex justify-center items-center mb-8">
        {[1, 2, 3, 4, 5, 6, 7].map((step) => (
          <React.Fragment key={step}>
            {/* Circle for each step */}
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold
                ${step === 2 ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-600'}`}
            >
              {step}
            </div>
            {/* Separator line between circles, except for the last one */}
            {step < 7 && (
              <div className="w-4 h-0.5 bg-gray-300"></div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Gender Question */}
      <h2 className="text-xl font-semibold text-gray-800 text-center mb-6">
        What is your gender?
      </h2>

      {/* Gender Selection Options */}
      <div className="space-y-4 mb-8 text-sm">
        {['Female', 'Male', 'Other'].map((genderOption) => (
          <div
            key={genderOption}
            className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer
              ${selectedGender === genderOption
                ? 'border-yellow-500 bg-yellow-50'
                : 'border-gray-300 bg-white hover:bg-gray-50'
              }`}
            onClick={() => setSelectedGender(genderOption)}
          >
            <div className="flex items-center space-x-3">
              {/* Gender Icon - Now using <img> tags with PNG sources */}
              {genderOption === 'Female' && (
                <img
                  src="/images/female.png" // Path relative to the public folder
                  alt="Female icon"
                  className="w-5 h-5 object-contain" // Tailwind classes for sizing and fit
                  onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/24x24/E0E0E0/000000?text=F"; }} // Fallback
                />
              )}
              {genderOption === 'Male' && (
                <img
                  src="/images/male.png" // Path relative to the public folder
                  alt="Male icon"
                  className="w-5 h-5 object-contain"
                  onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/24x24/E0E0E0/000000?text=M"; }} // Fallback
                />
              )}
              {genderOption === 'Other' && (
                <img
                  src="/images/lgbtq.png" // Assuming you have an 'other.png' or use a generic icon
                  alt="Other gender icon"
                  className="w-5 h-5 object-contain"
                  onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/24x24/E0E0E0/000000?text=O"; }} // Fallback
                />
              )}
              <span className="text-gray-800 font-medium">{genderOption}</span>
            </div>
            {/* Checkmark icon for selected option */}
            {selectedGender === genderOption && (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 text-yellow-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            )}
          </div>
        ))}
      </div>

      {/* Confirm Button */}
      <button
        onClick={handleConfirm}
        className="w-full bg-yellow-500 text-white font-semibold py-3 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition duration-300"
      >
        Next
      </button>
    </div>
  );
}

export default GenderSelectionScreen;