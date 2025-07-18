import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'

// Main App component that will render our CreateAccountName component
// CreateAccountName component for the first step of account creation
const NameInputScreen = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [lastName, setLastName] = useState('');

  const handleNext = () => {
    // In a real application, you would validate inputs and navigate to the next step
    console.log('First Name:', firstName);
    console.log('email:', email);
    console.log('Last Name:', lastName);
    navigate('/gender');
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg p-6 sm:p-8">
      {/* Back arrow icon - Placeholder for navigation */}
      <div className="flex justify-start mb-6">
        {/* Using a simple SVG for the back arrow icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6 text-gray-700 cursor-pointer"
          aria-label="Go back"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </div>

      {/* Logo - Placeholder for your 'dLBB' logo */}
      <div className="flex justify-center mb-8">
        <span className="text-4xl font-bold text-yellow-500">LB</span>
      </div>

      {/* Page Title */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-6">
        Create your Account
      </h1>

      {/* Progress Indicator (Steps 1-2-3-4-5) */}
      <div className="flex justify-center items-center  mb-8">
        {[1, 2, 3, 4, 5, 6, 7].map((step) => (
          <React.Fragment key={step}>
            {/* Circle for each step */}
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold
                ${step === 1 ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-600'}`}
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

      {/* Input Fields for Name */}
      <div className="space-y-4 mb-8">
        <div>
          <label htmlFor="firstName" className="sr-only">First Name</label>
          <input
            type="text"
            id="firstName"
            placeholder="First Name"
            className=" text-sm w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="lastName" className="sr-only">Last Name</label>
          <input
            type="text"
            id="lastName"
            placeholder="Last Name"
            className="text-sm w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
                <div>
          <label htmlFor="email" className="sr-only">Email</label>
          <input
            type="text"
            id="Email"
            placeholder="Email"
            className="text-sm w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="w-full bg-yellow-500 text-white font-semibold py-3 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition duration-300"
      >
        Next
      </button>
    </div>
  );
};

export default NameInputScreen;

