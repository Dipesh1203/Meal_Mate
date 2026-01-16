import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Signup from "../components/Signup";
import { Link } from "react-router-dom";

export default function Landing() {
  const [signupOpen, setSignupOpen] = useState(false);

  const handleSignupClose = () => setSignupOpen(false);
  const handleSignupOpen = () => setSignupOpen(true);

  return (
    <div className="font-sans bg-gradient-to-br from-green-50 via-white to-green-200 min-h-screen p-6 md:p-12">
      {/* Navigation */}
      <nav className="flex justify-between items-center w-full max-w-6xl mx-auto mb-16">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
            M
          </div>
          <span className="text-2xl font-bold text-gray-800 tracking-tight">
            Meal<span className="text-green-600">Mate</span>
          </span>
        </div>
        <div className="hidden md:flex gap-8 text-gray-600 font-medium">
          <a href="#features" className="hover:text-green-600 transition">
            Features
          </a>
          <a href="#about" className="hover:text-green-600 transition">
            Impact
          </a>
        </div>
        <button
          onClick={handleSignupOpen}
          className="bg-gray-800 text-white px-5 py-2 rounded-full hover:bg-black transition shadow-md"
        >
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Side: Text Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <div className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-green-700 uppercase bg-green-100 rounded-full">
            🌱 Sustainably Minded
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-[1.1]">
            Turn your{" "}
            <span className="text-green-500 underline decoration-green-200">
              Surplus
            </span>{" "}
            into a Smile.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0">
            Meal Mate helps you track, manage, and share excess food. Reduce
            waste, save costs, and feed your community with one smart platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link to="/login">
              <button className="w-full sm:w-auto px-8 py-4 bg-green-500 text-white font-bold rounded-2xl hover:bg-green-600 hover:shadow-lg transition-all text-lg">
                Login to Dashboard
              </button>
            </Link>
            <button
              onClick={handleSignupOpen}
              className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 font-bold rounded-2xl hover:border-green-500 hover:text-green-600 transition-all text-lg"
            >
              Create Account
            </button>
          </div>

          <div className="mt-8 flex items-center justify-center lg:justify-start gap-4 text-sm text-gray-500">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white bg-gray-300"
                ></div>
              ))}
            </div>
            <span>Join 500+ local food heroes</span>
          </div>
        </div>

        {/* Right Side: Mascot/Hero Image */}
        <div className="w-full lg:w-1/2 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-green-400 rounded-full filter blur-[80px] opacity-20 animate-pulse"></div>
          <img
            src="./ffw.png"
            alt="Meal Mate Mascot"
            className="relative z-10 w-full max-w-md mx-auto drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
          />
        </div>
      </main>

      {/* Simple Feature Bar */}
      <section
        id="features"
        className="max-w-6xl mx-auto mt-24 grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {[
          {
            title: "Smart Tracking",
            desc: "Never lose track of expiration dates again.",
            icon: "📅",
          },
          {
            title: "Community Share",
            desc: "Easily donate surplus food to local shelters.",
            icon: "🤝",
          },
          {
            title: "Waste Analytics",
            desc: "Visualize your impact and cost savings.",
            icon: "📈",
          },
        ].map((feat, idx) => (
          <div
            key={idx}
            className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-green-100 hover:border-green-300 transition shadow-sm"
          >
            <div className="text-3xl mb-3">{feat.icon}</div>
            <h3 className="font-bold text-gray-800 text-xl mb-2">
              {feat.title}
            </h3>
            <p className="text-gray-600">{feat.desc}</p>
          </div>
        ))}
      </section>

      {/* Signup Modal */}
      <Backdrop
        sx={(theme) => ({
          color: "#fff",
          zIndex: theme.zIndex.drawer + 1,
          backdropFilter: "blur(4px)",
        })}
        open={signupOpen}
        onClick={handleSignupClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl p-2 shadow-2xl"
        >
          <Signup />
        </div>
      </Backdrop>
    </div>
  );
}
