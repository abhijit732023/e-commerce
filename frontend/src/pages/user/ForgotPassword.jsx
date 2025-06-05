import React, { useState } from 'react';
import axios from 'axios';
import { ENV_File } from '../../FilesPaths/all_path';
import { motion } from "framer-motion";
import { FaEnvelopeOpenText } from "react-icons/fa";

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsSuccess(false);
    try {
      const res = await axios.post(`${ENV_File.backendURL}/forgot-password`, { email });
      setMessage(res.data.message);
      console.log(res.data);
      
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
            <FaEnvelopeOpenText className="text-white text-2xl" />
          </motion.div>
          <h2 className="text-2xl font-extrabold text-rose-700 mb-1 tracking-wide">
            Forgot Password
          </h2>
          <p className="text-gray-500 text-sm text-center">
            Enter your email to receive a password reset link.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <FaEnvelopeOpenText className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-400 focus:outline-none bg-gray-50"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <motion.button
            type="submit"
            whileTap={{ scale: 0.97 }}
            className="w-full bg-rose-600 text-white py-3 rounded-lg font-semibold shadow hover:bg-rose-700 transition duration-300"
          >
            Send Reset Link
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
      </motion.div>
    </div>
  );
}