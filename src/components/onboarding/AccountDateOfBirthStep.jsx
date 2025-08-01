import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { updateStep } from '../../store/onboardingSlice';
import { useDispatch, useSelector } from 'react-redux';

const AccountDateOfBirthStep = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const onboarding = useSelector((state) => state.onboarding);
  const userId = onboarding.userId || localStorage.getItem("userId");
  const dateOfBirth = onboarding.dateOfBirth;

  const handleNext = async (e) => {
    e.preventDefault();

    if (!dateOfBirth) {
      setError("Please select your date of birth.");
      return;
    }

    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/step3/${userId}`,
        {
          dateOfBirth,
          step: 3,
        }
      );

      navigate("/onboarding/password");
    } catch (error) {
      console.error("Error saving date of birth:", error);
      alert("Failed to save date of birth. Try again.");
    }
  };

  const handleDateChange = (date) => {
    dispatch(updateStep({ dateOfBirth: date.toISOString() }));
    setError("");
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg p-6 sm:p-8">
      {/* Back Navigation */}
      <div className="flex justify-start mb-6">
        <button onClick={() => navigate("/onboarding/gender")} aria-label="Go back">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-gray-700">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
      </div>

      {/* Branding */}
      <div className="flex justify-center mb-8">
        <span className="text-4xl font-bold text-yellow-500">LB</span>
      </div>

      {/* Header */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-6">
        Create your Account
      </h1>

      {/* Step Indicator */}
      <div className="flex justify-center items-center mb-8">
        {[1, 2, 3, 4, 5, 6, 7].map((step) => (
          <React.Fragment key={step}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold ${
              step === 3 ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-600"
            }`}>
              {step}
            </div>
            {step < 7 && <div className="w-4 h-0.5 bg-gray-300"></div>}
          </React.Fragment>
        ))}
      </div>

      {/* Prompt */}
      <h2 className="text-xl font-semibold text-gray-800 text-center mb-6">
        What is your Date of Birth?
      </h2>

      {/* Date Picker */}
      <div className="flex flex-col items-center w-full">
        <div className="relative mb-2 w-full">
          <label htmlFor="dob" className="sr-only">Date of Birth</label>
          <DatePicker
            id="dob"
            selected={dateOfBirth}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select Date"
            showYearDropdown
            showMonthDropdown
            dropdownMode="select"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-600 text-sm mb-4 self-start pl-1">{error}</p>}

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="w-full bg-yellow-500 text-white font-semibold py-3 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition duration-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AccountDateOfBirthStep;
