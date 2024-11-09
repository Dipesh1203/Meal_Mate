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
    <div className="font-sans bg-gradient-to-br from-green-50 to-green-300 h-screen overflow-hidden p-8 flex flex-col justify-center items-center">
      {/* Navigation */}
      <nav className="flex justify-between items-center w-full max-w-5xl mb-4">
        <div className="flex items-center">
          <img
            src="./logo.png"
            alt="Platform Logo"
            className="w-40 h-auto mr-4"
          />
        </div>
        <ul className="flex gap-8 text-gray-600 font-semibold text-lg">
          <li className="cursor-pointer">Our Mission</li>
          <li className="cursor-pointer">Solutions</li>
          <li className="cursor-pointer">Get Involved</li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex justify-between items-center w-full max-w-5xl">
        <div className="relative w-80">
          <img
            src="./Food_WastePlatformLanding.png"
            alt="Food Waste Platform"
            className="w-full h-auto"
          />
        </div>

        <div className="max-w-xl ml-8">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-6 leading-tight">
            Join Us in Reducing{" "}
            <span className="text-green-500">Food Waste</span> and Making a
            Difference
          </h1>
          <p className="text-xl text-gray-500 mb-8">
            Optimize your food management with smart tracking, predictive
            insights, and sustainable practices to help minimize waste and
            support communities.
          </p>
          <div className="flex gap-6">
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
