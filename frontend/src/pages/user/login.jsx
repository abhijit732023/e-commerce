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
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${ENV_File.backendURL}/login`, {
        identifier: data.identifier,
        password: data.password,
      });

      setMessage("Login successful! Redirecting...");
      setIsSuccess(true);
      login(response.data.user);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setMessage("Invalid email/phone or password");
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <div className="h-full flex flex-col bg-gradient-to-b from-rose-50 via-white to-amber-50">
        <main className="h-full flex-grow flex items-center justify-center px-4 py-8 md:py-0">
          <motion.div
            className="w-full max-w-sm bg-white shadow-2xl rounded-2xl p-4 sm:p-6 border border-rose-100"
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
              <h2 className="text-3xl font-extrabold text-rose-700 mb-1 tracking-wide text-center">
                Welcome Back
              </h2>
              <p className="text-gray-500 text-sm text-center">Login to your account</p>
            </div>

            {message && (
              <motion.p
                className={`text-center mb-4 font-semibold ${isSuccess ? "text-green-600" : "text-red-500"}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {message}
              </motion.p>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 sm:space-y-1">
              <div>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Email or Phone Number"
                    {...register("identifier", {
                      required: "Email or phone number is required",
                      validate: (value) =>
                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || // email regex
                        /^[0-9]{10,15}$/.test(value) ||             // phone regex
                        "Enter a valid email or phone number",
                    })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-400 focus:outline-none bg-gray-50 text-sm sm:text-base"
                  />
                </div>
                {errors.identifier && (
                  <p className="text-red-500 text-xs mt-1">{errors.identifier.message}</p>
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-400 focus:outline-none bg-gray-50 text-sm sm:text-base"
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 text-xs sm:text-sm">
                  <input
                    type="checkbox"
                    {...register("terms", { required: "Accept the terms and conditions" })}
                    className="form-checkbox accent-rose-500"
                  />
                  I accept the <Link to="/terms-and-conditions" className="text-rose-600 underline" target="_blank" rel="noopener noreferrer">Terms and Conditions</Link>
                </label>
                {errors.terms && (
                  <p className="text-red-500 text-xs mt-1">{errors.terms.message}</p>
                )}
              </div>

              <motion.button
                type="submit"
                whileTap={{ scale: 0.97 }}
                className="w-full bg-rose-600 text-white py-3 rounded-lg font-semibold shadow hover:bg-rose-700 transition duration-300 flex items-center justify-center text-sm sm:text-base"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </motion.button>

              <div className="text-sm text-right">
                <Link to="/forgot-password" className="text-gray-600 hover:underline">
                  Forgot Password?
                </Link>
              </div>
            </form>

            <p className="text-sm text-center text-gray-600 mt-5">
              Don't have an account?{" "}
              <Link to="/register" className="text-rose-600 hover:underline font-semibold">
                Sign Up
              </Link>
            </p>
          </motion.div>
        </main>

        <footer className="bg-gray-800 text-white py-4 rounded-t-2xl shadow-inner text-center text-sm">
          <p>© 2025 SS Collection. All rights reserved.</p>
        </footer>
      </div>
    </Container>
  );
}
