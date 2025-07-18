// PasswordScreen.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function PasswordScreen() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Password validation states
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFinish = () => {
    navigate('/location')
  };

  const RequirementItem = ({ text, met }) => (
    <div className="flex items-center mt-2">
      {met ? (
        <svg
          className="w-5 h-5 text-green-500 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
      ) : (
        <svg
          className="w-5 h-5 text-gray-400 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      )}
      <span className={`text-xs ${met ? "text-green-600" : "text-gray-500"}`}>
        {text}
      </span>
    </div>
  );

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
          onClick={() => navigate("/date")}
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
        Setup your Account
      </h1>

      {/* Progress Indicator (Steps 1-2-3-4-5) */}
      <div className="flex justify-center items-center mb-8">
        {[1, 2, 3, 4, 5, 6, 7].map((step) => (
          <React.Fragment key={step}>
            {/* Circle for each step */}
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold
                ${
                  step === 4
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

      {/* Password Creation Prompt */}
      <div className="w-full text-center text-sm text-yellow-700 bg-yellow-100 p-2 rounded mb-6">
        create new Password that meets all requirements
      </div>

      {/* New Password Input */}
      <div className="w-full relative mb-6">
        <label
          htmlFor="newPassword"
          className="block text-gray-700 text-sm font-medium mb-2"
        >
          New Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          id="newPassword"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          value={password}
          onChange={handlePasswordChange}
          placeholder="••••••••"
        />
        <button
          type="button"
          onClick={toggleShowPassword}
          className="absolute inset-y-0 right-0 pr-3 flex items-center pt-8 text-gray-500"
        >
          {showPassword ? (
            <img src="/images/openeye.png" />
          ) : (
            <img src="/images/closeeye.png" />
          )}
        </button>
      </div>

      {/* Password Requirements */}
      <div className="w-full mb-8">
        <RequirementItem text="At least 8 characters" met={hasMinLength} />
        <RequirementItem text="An Uppercase character" met={hasUppercase} />
        <RequirementItem text="A Lowercase character" met={hasLowercase} />
        <RequirementItem text="A Number" met={hasNumber} />
      </div>

      {/* Finish Button */}
      <button
        onClick={handleFinish}
        className={`w-full p-3 rounded-md text-white font-bold ${
          hasMinLength && hasUppercase && hasLowercase && hasNumber
            ? "bg-yellow-500 hover:bg-yellow-600"
            : "bg-gray-400 cursor-not-allowed"
        }`}
        disabled={!(hasMinLength && hasUppercase && hasLowercase && hasNumber)}
      >
        Next
      </button>
    </div>
  );
}

export default PasswordScreen;
