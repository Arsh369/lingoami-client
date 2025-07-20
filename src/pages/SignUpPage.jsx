// SignUpPage.jsx

import React from "react";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-white p-4 font-sans">
      {/* Main content area */}
      <div className="flex flex-col items-center justify-center flex-grow w-full max-w-sm">
        {/* Logo section */}
        <div className="mb-12 flex flex-col items-center">
          {/* "LB" text */}
          <span className="text-5xl font-bold text-amber-400 -mt-10">LB</span>
        </div>

        {/* Sign Up Button */}
        {/* <button
          className="w-full bg-amber-400 text-white py-3 rounded-xl font-semibold text-lg shadow-md hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 transition duration-300 ease-in-out mb-4"
          onClick={() => console.log('Sign Up clicked')}
        >
          Sign Up
        </button> */}
        <Link to="/onboarding/account-info" className="text-center w-full bg-amber-400 text-white py-3 rounded-xl font-semibold text-lg shadow-md hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 transition duration-300 ease-in-out mb-4">Sign Up</Link>
      </div>

      {/* Bottom section for "Already have an account?" */}
      <div className="mb-8 text-center">
        <p className="text-gray-600 text-sm">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-amber-500 font-semibold hover:underline"
            onClick={() => console.log("Sign In clicked")}
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
