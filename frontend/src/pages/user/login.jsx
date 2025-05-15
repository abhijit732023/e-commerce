import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth, ENV_File, Container } from "../../FilesPaths/all_path.js";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLock, FaEnvelope } from "react-icons/fa";

export default function LoginForm() {
  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${ENV_File.backendURL}/login`, data);
      setMessage("Login successful! Redirecting...");
      setIsSuccess(true);
      login(response.data.user);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setMessage("Invalid email or password");
      setIsSuccess(false);
    }
  };

  return (
    <Container>
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-rose-50 via-white to-amber-50">
        <main className="flex-grow flex items-center justify-center px-4">
          <motion.div
            className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 border border-rose-100"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="flex flex-col items-center mb-6">
              <motion.div
                className="bg-gradient-to-br from-rose-500 via-amber-400 to-rose-300 w-16 h-16 rounded-full flex items-center justify-center shadow-lg mb-2"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <FaLock className="text-white text-3xl" />
              </motion.div>
              <h2 className="text-3xl font-extrabold text-rose-700 mb-1 tracking-wide">
                Welcome Back
              </h2>
              <p className="text-gray-500 text-sm">Login to your account</p>
            </div>
            {message && (
              <motion.p
                className={`text-center mb-4 font-semibold ${
                  isSuccess ? "text-green-600" : "text-red-500"
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {message}
              </motion.p>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Email"
                    {...register("email", { required: "Email is required" })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-400 focus:outline-none bg-gray-50"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>
              <div>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-400 focus:outline-none bg-gray-50"
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <motion.button
                type="submit"
                whileTap={{ scale: 0.97 }}
                className="w-full bg-rose-600 text-white py-3 rounded-lg font-semibold shadow hover:bg-rose-700 transition duration-300"
              >
                Login
              </motion.button>

              {/* Forgot Password Link */}
              <div className="text-sm text-right">
                <Link
                  to="/forgot-password"
                  className="text-gray-600 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </form>

            <p className="text-sm text-center text-gray-600 mt-4">
              Don't have an account?{" "}
              <Link to="/register" className="text-rose-600 hover:underline font-semibold">
                Sign Up
              </Link>
            </p>
          </motion.div>
        </main>

        <footer className="bg-gray-800 text-white pb-8 py-4 mt-8 rounded-t-2xl shadow-inner">
          <div className="text-center text-sm">
            <p>© 2025 SS Collection. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Container>
  );
}