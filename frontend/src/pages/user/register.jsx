import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth, ENV_File, Container } from "../../FilesPaths/all_path.js";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserPlus, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";

export default function RegisterForm() {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (user && user.username === data.username) {
      setMessage("Username already exists. Please choose another username.");
      setIsSuccess(false);
      return;
    }

    if (user && user.email === data.email) {
      setMessage("Email already exists. Please use a different email.");
      setIsSuccess(false);
      return;
    }

    try {
      const response = await axios.post(`${ENV_File.backendURL}/register`, data);
      setMessage("User registered successfully! Redirecting to login...");
      setIsSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      setIsSuccess(false);
    }
  };

  return (
    <Container>
      <div className="min-h-[84vh] flex flex-col bg-gradient-to-b from-rose-50 via-white to-amber-50">
        <div className="flex-grow flex items-center justify-center px-2">
          <motion.div
            className="w-full max-w-xs sm:max-w-md md:max-w-lg bg-white px-4  py-6 sm:p-8 rounded-2xl shadow-2xl border border-rose-100"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="flex flex-col items-center mb-6">
              <motion.div
                className="bg-gradient-to-br from-rose-500 via-amber-400 to-rose-300 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-lg mb-2"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <FaUserPlus className="text-white text-xl sm:text-2xl" />
              </motion.div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-rose-700 mb-1 tracking-wide text-center">
                Join SS Collection
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm text-center px-2 sm:px-0">
                Create an account to explore the latest trends and exclusive offers.
              </p>
            </div>

            {message && (
              <motion.p
                className={`text-center mb-4 font-semibold ${isSuccess ? "text-green-600" : "text-red-500"
                  } text-sm sm:text-base`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {message}
              </motion.p>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-3">
              {/* Username */}
              <div>
                <div className="relative">
                  <FaUserPlus className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Username"
                    {...register("username", { required: "Username is required" })}
                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-400 focus:outline-none bg-gray-50 text-sm sm:text-base"
                  />
                </div>
                {errors.username && (
                  <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Email"
                    {...register("email", { required: "Email is required" })}
                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-400 focus:outline-none bg-gray-50 text-sm sm:text-base"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>

              {/* Mobile Number */}
              <div>
                <div className="relative">
                  <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    {...register("mobileNumber", {
                      required: "Mobile number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Mobile number must be 10 digits",
                      },
                    })}
                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-400 focus:outline-none bg-gray-50 text-sm sm:text-base"
                  />
                </div>
                {errors.mobileNumber && (
                  <p className="text-red-500 text-xs mt-1">{errors.mobileNumber.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 8, message: "Password must be at least 8 characters" },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
                      message:
                        "Password must contain at least 1 uppercase, lowercase characters, numbers, and at least 1 special character",
                    },
                  })}
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-400 focus:outline-none bg-gray-50 text-sm sm:text-base"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                )}
              </div>

              <motion.button
                type="submit"
                whileTap={{ scale: 0.97 }}
                className="w-full bg-rose-600 text-white py-3 rounded-lg font-semibold shadow hover:bg-rose-700 transition duration-300 text-sm sm:text-base"
              >
                Register
              </motion.button>
            </form>

            <div className="text-center mt-6">
              <p className="text-sm sm:text-base text-gray-500">
                Already have an account?{" "}
                <Link to={"/login"} className="text-rose-600 hover:underline font-semibold">
                  Sign In
                </Link>
              </p>
            </div>
          </motion.div>
        </div>

        <footer className="bg-gray-800 text-white py-4 pb-4 mt-8 rounded-t-2xl shadow-inner text-center text-xs sm:text-sm">
          <p>© 2025 SS Collection. All rights reserved.</p>
        </footer>
      </div>
    </Container>
  );
}
