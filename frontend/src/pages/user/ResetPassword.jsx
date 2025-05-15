import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ENV_File } from '../../FilesPaths/all_path';
import { motion } from "framer-motion";
import { FaLock } from "react-icons/fa";

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsSuccess(false);
    try {
      const res = await axios.post(`${ENV_File.backendURL}/reset-password/${token}`, { password });
      setMessage(res.data.message);
      setIsSuccess(true);
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong.");
      setIsSuccess(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-rose-50 via-white to-amber-50 p-4">
      <motion.div
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-rose-100"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="flex flex-col items-center mb-6">
          <motion.div
            className="bg-gradient-to-br from-rose-500 via-amber-400 to-rose-300 w-14 h-14 rounded-full flex items-center justify-center shadow-lg mb-2"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <FaLock className="text-white text-2xl" />
          </motion.div>
          <h2 className="text-2xl font-extrabold text-rose-700 mb-1 tracking-wide">
            Reset Your Password
          </h2>
          <p className="text-gray-500 text-sm text-center">
            Enter your new password below.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-400 focus:outline-none bg-gray-50"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
          </div>
          <motion.button
            type="submit"
            whileTap={{ scale: 0.97 }}
            className="w-full bg-rose-600 text-white py-3 rounded-lg font-semibold shadow hover:bg-rose-700 transition duration-300"
          >
            Reset Password
          </motion.button>
        </form>
        {message && (
          <motion.p
            className={`mt-4 text-sm text-center font-semibold ${isSuccess ? "text-green-600" : "text-red-500"}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {message}
          </motion.p>
        )}
        {isSuccess && (
          <div className="text-center mt-4">
            <Link
              to="/login"
              className="inline-block bg-rose-600 text-white px-6 py-2 rounded-full shadow hover:bg-rose-700 transition-all duration-200 font-semibold"
            >
              Go to Login
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}