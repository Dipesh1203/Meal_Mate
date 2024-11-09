import React, { useState } from 'react';
import Backdrop from "@mui/material/Backdrop";
import Login from '../components/Login';
import Signup from '../components/Signup';

export default function Landing() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  const handleSignupClose = () => {
    setSignupOpen(false);
  };

  const handleLoginOpen = () => {
    setSignupOpen(false);  
    setLoginOpen(true);
  };

  const handleSignupOpen = () => {
    setLoginOpen(false);
    setSignupOpen(true);
  };

  return (
    <div className="font-sans bg-gradient-to-br from-orange-50 to-orange-300 h-screen overflow-hidden p-8 flex flex-col justify-center items-center">
      {/* Navigation */}
      <nav className="flex justify-between items-center w-full max-w-5xl mb-4">
        <div className="flex items-center">
          <img src="./logo.png" alt="Logo" className="w-40 h-auto mr-4" />
        </div>
        <ul className="flex gap-8 text-gray-600 font-semibold text-lg">
          <li className="cursor-pointer">About Us</li>
          <li className="cursor-pointer">Services</li>
          <li className="cursor-pointer">Contact</li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex justify-between items-center w-full max-w-5xl">
        <div className="relative w-80">
          <img src="./Food_ManagementLanding.png" alt="Food_Management" className="w-full h-auto" />
        </div>

        <div className="max-w-xl ml-8">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-6 leading-tight">
            Empower Your Food Management with <span className="text-orange-500">Food_Management</span>
          </h1>
          <p className="text-xl text-gray-500 mb-8">Preserve your Food from tomorrow </p>
          <div className="flex gap-6">
            <button onClick={handleSignupOpen} className="px-6 py-3 border-2 border-orange-500 text-orange-500 font-bold rounded-lg hover:bg-orange-50 transition text-lg">
              Sign Up
            </button>
            <button onClick={handleLoginOpen} className="px-6 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition text-lg">
              Login
            </button>
          </div>
        </div>
      </div>
      <Backdrop
        sx={(theme) => ({
          color: "#fff",
          zIndex: theme.zIndex.drawer + 1,
        })}
        open={loginOpen}
        onClick={handleLoginClose}
      >
        <div onClick={(e) => e.stopPropagation()}>
          <Login handleSignupOpen={handleSignupOpen}/>
        </div>
      </Backdrop>
      <Backdrop
        sx={(theme) => ({
          color: "#fff",
          zIndex: theme.zIndex.drawer + 1,
        })}
        open={signupOpen}
        onClick={handleSignupClose}
      >
        <div onClick={(e) => e.stopPropagation()}>
          <Signup handleLoginOpen={handleLoginOpen} />
        </div>
      </Backdrop>
    </div>
  );
}
