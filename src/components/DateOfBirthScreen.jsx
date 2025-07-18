import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useNavigate} from "react-router-dom"

// CreateAccountDOB component for the third step of account creation
const DateOfBirthScreen = () => {
  const navigate = useNavigate();
  // State to hold the selected date of birth
  const [dateOfBirth, setDateOfBirth] = React.useState("");

  // Function to handle the "Next" button click
  const handleNext = () => {
    // In a real application, you would validate the date and navigate to the next step
    console.log("Selected Date of Birth:", dateOfBirth);
    navigate("/password");
    
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg  p-6 sm:p-8">
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
          onClick={() => navigate("/gender")}
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
        Create your Account
      </h1>

      {/* Progress Indicator (Steps 1-2-3-4-5) */}
      <div className="flex justify-center items-center mb-8">
        {[1, 2, 3, 4, 5, 6, 7].map((step) => (
          <React.Fragment key={step}>
            {/* Circle for each step */}
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold
                ${
                  step === 3
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

      {/* Date of Birth Question */}
      <h2 className="text-xl font-semibold text-gray-800 text-center mb-6">
        What is your Date Of Birth ?
      </h2>
      <div className="flex flex-col items-center">
              {/* Date Input Field with Calendar Icon */}
      <div className="relative mb-8">
        <label htmlFor="dob" className="sr-only">
          Date of Birth
        </label>
        <DatePicker
          id="dob"
          selected={dateOfBirth}
          onChange={(date) => setDateOfBirth(date)}
          dateFormat="dd/MM/yyyy" // You can change the date format
          placeholderText="Select Date"
          showYearDropdown // Enables year selection dropdown
          showMonthDropdown // Enables month selection dropdown
          dropdownMode="select" // Changes dropdowns to select boxes
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 custom-datepicker-input" // Custom class for Tailwind
        />
      </div>

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

export default DateOfBirthScreen;
