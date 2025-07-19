import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { updateStep, setUserId } from '../../store/onboardingSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AccountNameEmailStep = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { firstName, lastName, email } = useSelector(state => state.onboarding);

  // Error state
  const [errors, setErrors] = useState({});

  // Email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Input change handler
  const handleChange = (field) => (e) => {
    dispatch(updateStep({ [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  // Validation
  const validate = () => {
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Next
  const handleNext = async () => {
    if (!validate()) return;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/step1`,
        { firstName, lastName, email }
      );
      localStorage.setItem("firstName", firstName);
      const userId = response.data.userId;
      dispatch(setUserId(userId));
      localStorage.setItem('userId', userId); // optional

      navigate('/onboarding/gender');
    } catch (error) {
      console.error('Registration error:', error);
      alert('Failed to register. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-xl p-6 sm:p-8 mx-auto">
      {/* Back Button */}
      <div className="mb-6">
        <button
          aria-label="Go back"
          onClick={() => navigate(-1)}
          className="text-gray-700 hover:text-gray-900 transition"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
      </div>

      {/* Logo */}
      <div className="flex justify-center mb-8">
        <span className="text-4xl font-extrabold text-yellow-500">LB</span>
      </div>

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-6">
        Create your Account
      </h1>

      {/* Progress Steps */}
      <div className="flex justify-center items-center mb-8">
        {Array.from({ length: 7 }, (_, i) => i + 1).map((step) => (
          <React.Fragment key={step}>
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold
                ${step === 1 ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-600'}`}
            >
              {step}
            </div>
            {step < 7 && <div className="w-4 h-0.5 bg-gray-300"></div>}
          </React.Fragment>
        ))}
      </div>

      {/* Form */}
      <form className="space-y-4 mb-8" onSubmit={(e) => e.preventDefault()}>
        {/* First Name */}
        <div>
          <input
            id="firstName"
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={handleChange('firstName')}
            className={`w-full px-4 py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 ${
              errors.firstName
                ? 'border-red-500 focus:ring-red-400'
                : 'border-gray-300 focus:ring-yellow-500'
            }`}
            autoComplete="given-name"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <input
            id="lastName"
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={handleChange('lastName')}
            className={`w-full px-4 py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 ${
              errors.lastName
                ? 'border-red-500 focus:ring-red-400'
                : 'border-gray-300 focus:ring-yellow-500'
            }`}
            autoComplete="family-name"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleChange('email')}
            className={`w-full px-4 py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 ${
              errors.email
                ? 'border-red-500 focus:ring-red-400'
                : 'border-gray-300 focus:ring-yellow-500'
            }`}
            autoComplete="email"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>
      </form>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="w-full bg-yellow-500 text-white font-semibold py-3 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
      >
        Next
      </button>
    </div>
  );
};

export default AccountNameEmailStep;