// AccountPasswordStep.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AccountPasswordStep = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isValidLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  const isFormValid = isValidLength && hasUppercase && hasLowercase && hasNumber;

  const handlePasswordChange = (e) => setPassword(e.target.value);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const handleNext = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');

        if (!userId) {
      alert('User ID not found. Please restart registration.');
      return;
    }

    try {
      await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register/step4/${userId}`, {
        password,
        step: 4
      });

      navigate('/onboarding/location');
    } catch (error) {
      console.error('Error saving password:', error);
      alert('Failed to save password. Try again.');
    }
  };

  const RequirementItem = ({ text, met }) => (
    <div className="flex items-center mt-2">
      <svg
        className={`w-5 h-5 mr-2 ${met ? "text-green-500" : "text-gray-400"}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d={met ? "M5 13l4 4L19 7" : "M6 18L18 6M6 6l12 12"}
        />
      </svg>
      <span className={`text-xs ${met ? "text-green-600" : "text-gray-500"}`}>{text}</span>
    </div>
  );

  return (
    <div className="w-full max-w-md bg-white rounded-lg p-6 sm:p-8">
      {/* Back Button */}
      <div className="flex justify-start mb-6">
        <svg
          onClick={() => navigate("/onboarding/date-of-birth")}
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

      {/* Logo */}
      <div className="flex justify-center mb-8">
        <span className="text-4xl font-bold text-yellow-500">LB</span>
      </div>

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-6">
        Setup Your Account
      </h1>

      {/* Progress Steps */}
      <div className="flex justify-center items-center mb-8">
        {[1, 2, 3, 4, 5, 6, 7].map((step) => (
          <React.Fragment key={step}>
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold ${
                step === 4 ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              {step}
            </div>
            {step < 7 && <div className="w-4 h-0.5 bg-gray-300" />}
          </React.Fragment>
        ))}
      </div>

      {/* Info Banner */}
      <div className="w-full text-center text-sm text-yellow-700 bg-yellow-100 p-2 rounded mb-6">
        Create a password that meets all the requirements.
      </div>

      {/* Password Input */}
      <div className="relative mb-6">
        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
          New Password
        </label>
        <input
          id="newPassword"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={handlePasswordChange}
          placeholder="••••••••"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none"
        />
        <button
          type="button"
          onClick={toggleShowPassword}
          className="absolute inset-y-0 right-0 pr-3 flex items-center pt-8 text-gray-500"
        >
          <img src={showPassword ? "/images/openeye.png" : "/images/closeeye.png"} alt="Toggle" />
        </button>
      </div>

      {/* Password Criteria */}
      <div className="mb-8">
        <RequirementItem text="At least 8 characters" met={isValidLength} />
        <RequirementItem text="An uppercase character" met={hasUppercase} />
        <RequirementItem text="A lowercase character" met={hasLowercase} />
        <RequirementItem text="A number" met={hasNumber} />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleNext}
        className={`w-full p-3 rounded-md text-white font-bold ${
          isFormValid ? "bg-yellow-500 hover:bg-yellow-600" : "bg-gray-400 cursor-not-allowed"
        }`}
        disabled={!isFormValid}
      >
        Next
      </button>
    </div>
  );
};

export default AccountPasswordStep;
