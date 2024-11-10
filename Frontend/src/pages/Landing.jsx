import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Signup from "../components/Signup";
import { Link } from "react-router-dom";

export default function Landing() {
  const [signupOpen, setSignupOpen] = useState(false);

  const handleSignupClose = () => {
    setSignupOpen(false);
  };

  const handleSignupOpen = () => {
    setSignupOpen(true);
  };

  return (
    <div className="font-sans bg-gradient-to-br from-green-50 to-green-300 min-h-screen overflow-hidden p-8 flex flex-col justify-center items-center">
      {/* Navigation */}
      <nav className="flex justify-between items-center w-full max-w-5xl mb-4">
        {/* Add navigation links here if needed */}
      </nav>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row justify-between items-center w-full max-w-5xl">
        <div className="relative w-full lg:w-1/2 mb-8 lg:mb-0 flex justify-center">
          <img
            src="./ffw.png"
            alt="Food Waste Platform"
            className="w-full max-w-sm md:max-w-md lg:max-w-none h-auto"
          />
        </div>

        <div className="max-w-xl lg:ml-8 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 leading-tight">
            Join Us in Reducing{" "}
            <span className="text-green-500">Food Waste</span> and Making a
            Difference
          </h1>
          <p className="text-lg md:text-xl text-gray-500 mb-8">
            Optimize your food management with smart tracking, predictive
            insights, and sustainable practices to help minimize waste and
            support communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
            <button
              onClick={handleSignupOpen}
              className="px-6 py-3 border-2 border-green-500 text-green-500 font-bold rounded-lg hover:opacity-90 transition text-lg"
            >
              Sign Up
            </button>
            <Link to="/login">
              <button className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition text-lg">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>

      <Backdrop
        sx={(theme) => ({
          color: "#fff",
          zIndex: theme.zIndex.drawer + 1,
        })}
        open={signupOpen}
        onClick={handleSignupClose}
      >
        <div onClick={(e) => e.stopPropagation()}>
          <Signup />
        </div>
      </Backdrop>
    </div>
  );
}
