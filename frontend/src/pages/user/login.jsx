import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth, ENV_File } from "../../FilesPaths/all_path.js";
import { FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function LoginForm() {
  const { user, login } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${ENV_File.backendURL}/login`, data);
      console.log("Login successful:", response.data);
      setMessage("Login successful!");
      login(response.data.user);

      // Store token or redirect if needed
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setMessage("Invalid email or password");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back</h2>
          {message && <p className="text-red-500 text-center mb-4">{message}</p>}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <input
                type="email"
                placeholder="Email"
                {...register("email", { required: "Email is required" })}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-black focus:outline-none"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-black focus:outline-none"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            <button type="submit" className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-900 transition">
              Login
            </button>
            <p className="text-sm text-right text-gray-600 hover:underline cursor-pointer"
              onClick={() => window.location.href = "/forgot-password"}>
              Forgot Password?
            </p>
          </form>
          <p className="text-sm text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link to={'/register'} className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </main>

      <footer className="bg-black/90 text-white mt-15">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-xl font-semibold mb-4">About SS Collection</h4>
            <p className="text-sm text-gray-300">
              Innovative and artistic, SS Collection celebrates the rich crafts of India. We design for the modern Indian woman who blends international style with ethnic elegance.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">The Company</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Store Locator</li>
              <li>Custom Measurement</li>
              <li>Shipping & Payments Terms</li>
              <li>Refunds & Returns</li>
              <li>FAQ</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Need Help</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2"><FaPhone /> +91-90000-00000</li>
              <li className="flex items-center gap-2"><FaEnvelope /> support@tajfashion.in</li>
              <li className="flex items-center gap-2"><FaMapMarkerAlt /> Mumbai, India</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>
        </div>
        <p className="text-center text-xs text-gray-400 mt-8">© 2025 SS Collection. All rights reserved.</p>
      </footer>
    </div>
  );
}