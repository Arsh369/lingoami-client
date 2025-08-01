import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { updateStep } from '../../store/onboardingSlice'; // ✅ Import action

const AccountGenderSelectionStep = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = React.useState('');
  const { userId, gender } = useSelector((state) => state.onboarding); // ✅ Access Redux

  const genderOptions = [
    { label: 'Female', icon: '/images/female.png', fallback: 'F' },
    { label: 'Male', icon: '/images/male.png', fallback: 'M' },
    { label: 'Other', icon: '/images/lgbtq.png', fallback: 'O' }
  ];

  const handleConfirm = async (e) => {
    e.preventDefault();

    if (!gender) {
      setError('Please select your gender to proceed.');
      return;
    }

    if (!userId) {
      alert('User ID not found. Please restart registration.');
      return;
    }

    try {
      console.log(gender)
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/auth/step2/${userId}`, {
        gender,
        step: 2
      });

      navigate('/onboarding/date-of-birth');
    } catch (error) {
      console.error('Error updating gender:', error);
      alert('Failed to save gender. Try again.');
    }
  };

  const handleGenderSelect = (selected) => {
    dispatch(updateStep({ gender: selected })); // ✅ Update Redux
    setError('');
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg p-6 sm:p-8">
      {/* Back */}
      <div className="flex justify-start mb-6">
        <svg
          onClick={() => navigate('/onboarding/account-info')}
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-gray-700 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </div>

      <div className="flex justify-center mb-8">
        <span className="text-4xl font-bold text-yellow-500">LB</span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-6">
        Create your Account
      </h1>

      <div className="flex justify-center items-center mb-8">
        {[1, 2, 3, 4, 5, 6, 7].map((step) => (
          <React.Fragment key={step}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold ${
              step === 2 ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              {step}
            </div>
            {step < 7 && <div className="w-4 h-0.5 bg-gray-300"></div>}
          </React.Fragment>
        ))}
      </div>

      <h2 className="text-xl font-semibold text-gray-800 text-center mb-6">
        What is your gender?
      </h2>

      <div className="space-y-4 mb-4 text-sm">
        {genderOptions.map(({ label, icon, fallback }) => (
          <div
            key={label}
            onClick={() => handleGenderSelect(label)}
            className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition
              ${gender === label ? 'border-yellow-500 bg-yellow-50' : 'border-gray-300 bg-white hover:bg-gray-50'}`}
          >
            <div className="flex items-center space-x-3">
              <img
                src={icon}
                alt={`${label} icon`}
                className="w-5 h-5 object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://placehold.co/24x24/E0E0E0/000000?text=${fallback}`;
                }}
              />
              <span className="text-gray-800 font-medium">{label}</span>
            </div>
            {gender === label && (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 text-yellow-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            )}
          </div>
        ))}
      </div>

      {error && (
        <p className="text-red-500 text-sm mb-4 text-center">
          {error}
        </p>
      )}

      <button
        onClick={handleConfirm}
        className="w-full bg-yellow-500 text-white font-semibold py-3 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition duration-300"
      >
        Next
      </button>
    </div>
  );
};

export default AccountGenderSelectionStep;
