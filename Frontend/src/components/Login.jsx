import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { app } from '../firebase';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from 'react-toastify';

export default function Login({ handleSignupOpen }) {
  const [formData, setFormData] = useState({});
  const [err, setErr] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (err) {
      setErr("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth(app);
    const { email, password } = formData;

    if (email && password) {
      dispatch(signInStart());

      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        dispatch(signInSuccess({ email: user.email, uid: user.uid }));
        toast.success("You're Successfully Logged In");
        navigate('/');
      } catch (error) {
        dispatch(signInFailure(error.message));
        setErr(error.message);
      }
    } else {
      setErr('Please fill in all fields');
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-slate-50 text-slate-700 p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-2">Login</h2>
        <p className="mb-4">Glad you're back!</p>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="text"
              className="mt-1 w-full px-4 py-2 border-2 border-gray-400 rounded-lg text-base focus:ring focus:ring-blue-400 focus:outline-none"
              placeholder="Email"
              name='email'
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="mt-1 w-full px-4 py-2 border-2 border-gray-400 rounded-lg text-base focus:ring focus:ring-blue-400 focus:outline-none"
              placeholder="Password"
              name='password'
              onChange={handleChange}
            />
          </div>
          {err && <p className='text-red-500 text-xs mb-1 max-w-full break-words'>{err}</p>}
          <div className="flex items-center mb-4">
            <input type="checkbox" id="rememberMe" className="mr-2" />
            <label htmlFor="rememberMe" className="text-gray-700">Remember me</label>
          </div>
          <button
            type='submit'
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-purple-400 to-blue-500 text-white p-2 rounded shadow flex justify-center items-center hover:opacity-95"
            disabled={loading} // Disable button when loading is true
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <button onClick={handleSignupOpen} className="text-blue-500">
            Don't have an account? Signup
          </button>
        </div>
        <div className="mt-4 flex justify-between text-sm text-gray-500 gap-6">
          <a href="#">Terms & Conditions</a>
          <a href="#">Support</a>
          <a href="#">Customer Care</a>
        </div>
      </div>
    </div>
  );
}
