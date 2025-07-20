import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // ✅ import axios
import { useNavigate } from "react-router-dom";
const SignInPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
        email,
        password
      });

      console.log("Login success:", response.data);

      // Optional: store token or navigate
      // localStorage.setItem("token", response.data.token);
      navigate("/");

    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4 font-sans">
      <div className="flex flex-col items-center w-full max-w-sm px-4">
        <div className="mb-8 flex flex-col items-center">
          <span className="text-4xl font-bold text-amber-400">LB</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Let's Log In</h1>

        <input
          type="email"
          placeholder="Email"
          className="text-sm w-full px-4 py-3 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative w-full mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="text-sm w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 pr-12"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <img src="/images/openeye.png" alt="Hide password" />
            ) : (
              <img src="/images/closeeye.png" alt="Show password" />
            )}
          </button>
        </div>

        <div className="w-full flex justify-between items-center mb-6">
          <label className="flex items-center text-gray-600 text-xs">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-amber-400 rounded border-gray-300 focus:ring-amber-400 mr-2"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span>Remember Me</span>
          </label>
          <a
            href="#"
            className="text-amber-500 font-semibold text-xs hover:underline"
            onClick={() => console.log("Forgot Password clicked")}
          >
            Forgot Password?
          </a>
        </div>

        <button
          className="w-full bg-amber-400 text-white py-3 rounded-xl font-semibold text-lg shadow-md hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 transition duration-300 ease-in-out mb-6"
          onClick={handleSignIn}
        >
          Sign In
        </button>

        <div className="text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-amber-500 font-semibold hover:underline"
              onClick={() => console.log("Sign Up clicked")}
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
