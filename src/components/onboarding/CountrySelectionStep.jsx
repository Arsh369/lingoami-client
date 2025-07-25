import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import countries from "../../../../shared/countries.json";
import { updateStep } from '../../store/onboardingSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const CountrySelectionStep = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');

  const onboarding = useSelector((state) => state.onboarding);
  const userId = onboarding.userId || localStorage.getItem("userId");
  const selectedCountry = onboarding.selectedCountry || null;

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCountrySelection = (country) => {
    dispatch(updateStep({ selectedCountry: country }));
    setError('');
  };

  const handleNext = async (e) => {
    e.preventDefault();
    
    if (!selectedCountry) {
      setError('Please select a country.');
      return;
    }

    if (!userId || userId === "undefined" || userId === "null") {
      setError('User ID not found. Please restart registration.');
      console.error('Missing or invalid userId:', userId);
      return;
    }
 
    try {
      console.log(`Selected Country: ${selectedCountry.name}`);
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/auth/step5/${userId}`, {
        country: selectedCountry.name,
        step: 5
      });
      localStorage.setItem('country', selectedCountry.name);
      localStorage.setItem("countryCode", selectedCountry.code);
      navigate('/onboarding/language');
    } catch (error) {
      console.error('Error saving country:', error);
      setError('Failed to save country. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-md h-screen p-6 sm:p-8 bg-white rounded-lg flex flex-col">
      
      {/* Back Button */}
      <div className="flex justify-start mb-6">
        <button
          onClick={() => navigate('/onboarding/password')}
          aria-label="Go back"
          className="text-gray-700 hover:text-gray-900"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
      </div>

      {/* Logo */}
      <div className="flex justify-center mb-8">
        <span className="text-4xl font-bold text-yellow-500">LB</span>
      </div>

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-6">
        Where are you from?
      </h1>

      {/* Progress Indicator */}
      <div className="flex justify-center items-center mb-8">
        {[1, 2, 3, 4, 5, 6, 7].map(step => (
          <React.Fragment key={step}>
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold ${
                step === 5 ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-600'
              }`}
            >
              {step}
            </div>
            {step < 7 && <div className="w-4 h-0.5 bg-gray-300"></div>}
          </React.Fragment>
        ))}
      </div>

      {/* Search Field */}
      <div className="relative mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search"
          className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </div>
      </div>

      {/* A-Z Label */}
      <div className="text-sm font-semibold text-gray-500 mb-3">A-Z</div>

      {/* Country List */}
      <div className="flex-grow overflow-y-auto space-y-3 pr-2 custom-scrollbar">
        {filteredCountries.length > 0 ? (
          filteredCountries.map(country => (
            <div
              key={country.code}
              onClick={() => handleCountrySelection(country)}
              className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition ${
                selectedCountry?.code === country.code
                  ? 'border-yellow-500 bg-yellow-50'
                  : 'border-gray-300 bg-white hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <img
                  src={country.flag}
                  alt={`${country.name} flag`}
                  className="w-8 h-6 rounded-sm shadow-sm flex-shrink-0"
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src = `https://placehold.co/32x24/F0F0F0/000000?text=${country.code}`;
                  }}
                />
                <span className="text-gray-800 font-medium">{country.name}</span>
              </div>
              {selectedCountry?.code === country.code && (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-4">No countries found.</p>
        )}
      </div>

      {/* Error Message */}
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

      {/* Confirm Button */}
      <button
        onClick={handleNext}
        className="mt-6 w-full py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition duration-300"
      >
        Next
      </button>

      {/* Custom Scrollbar Styling */}
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
    </div>
  );
};    

export default CountrySelectionStep;