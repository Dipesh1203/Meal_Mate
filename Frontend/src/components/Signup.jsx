import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import { app } from "./../firebase";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";

export default function Signup({ handleLoginOpen }) {
  const [formData, setFormData] = useState({});
  const [err, setErr] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth(app);
    const { email, password ,name} = formData;
    if (email && password) {
      dispatch(signInStart());
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          dispatch(signInSuccess({ name: name,email: user.email, uid: user.uid }));
          toast.success("You are successfully signed up");
          navigate("/analytics");
        })
        .catch((error) => {
          setErr(error.message);
          dispatch(signInFailure(error.message));
        });
    } else {
      setErr("Please fill in all fields");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (err) {
      setErr("");
    }
  };

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      setErr("");
      const result = await signInWithPopup(auth, provider);

      // const res = await fetch("/api/auth/google", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     name: result.user.displayName,
      //     email: result.user.email,
      //     photo: result.user.photoURL,
      //   }),
      // });
      // const data = await res.json();
      dispatch(signInSuccess({name:result.user.displayName,email:result.user.email,photo:result.user.photoURL}));
      toast.success("You are successfully authenticated by Google");
      navigate("/analytics");
    } catch (error) {
      console.log("Could not sign in with google", error);
    }
  };

  return (
    <div className="bg-slate-50 text-slate-700 p-6 rounded-lg shadow-lg w-full max-w-lg">
      <h2 className="text-3xl font-bold mb-2">Sign up</h2>
      <p className="mb-4">Join us today!</p>
      <form>
        <div className="mb-2">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            className="mt-1 w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-base focus:ring focus:ring-blue-400 focus:outline-none"
            placeholder="Name"
            name="name"
            onChange={handleChange}
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="mt-1 w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-base focus:ring focus:ring-blue-400 focus:outline-none"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            className="mt-1 w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-base focus:ring focus:ring-blue-400 focus:outline-none"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          {err && (
            <p className="text-red-500 text-xs max-w-full break-words">{err}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-400 to-blue-500 text-white p-2 rounded shadow flex justify-center items-center hover:opacity-95"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Signup"}
        </button>
        <div className="text-center mt-2">
          <button
            type="button"
            onClick={handleLoginOpen}
            className="text-blue-500"
          >
            Already have an account? Login
          </button>
        </div>
      </form>
      <div className="mt-4 flex items-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-2 text-gray-500">Or</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <div className="mt-4 flex justify-center gap-4">
        <button
          onClick={handleGoogleClick}
          className="bg-white border border-gray-300 p-2 rounded-full flex items-center transition-transform duration-200 ease-in-out hover:shadow-lg hover:scale-110"
        >
          <img src="./google.png" alt="Google" className="w-6 h-6" />
        </button>
        <button className="bg-white border border-gray-300 p-2 rounded-full flex items-center shadow transition-transform duration-200 ease-in-out hover:shadow-lg hover:scale-110">
          <img src="./facebook.png" alt="Facebook" className="w-6 h-6" />
        </button>
        <button className="bg-white border border-gray-300 p-2 rounded-full flex items-center shadow transition-transform duration-200 ease-in-out hover:shadow-lg hover:scale-110">
          <img src="./github.png" alt="GitHub" className="w-6 h-6" />
        </button>
      </div>

      <div className="mt-4 flex justify-between text-sm text-gray-500 gap-6">
        <a href="#">Terms & Conditions</a>
        <a href="#">Support</a>
        <a href="#">Customer Care</a>
      </div>
    </div>
  );
}
