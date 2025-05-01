import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth, MobileMenu } from "../../FilesPaths/all_path.js";

export default function RegisterForm() {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    // Check if username already exists
    if (user && user.username === data.username) {
      setMessage("Username already exists. Please choose another username.");
      return;
    }

    // Check if email already exists
    if (user && user.email === data.email) {
      setMessage("Email already exists. Please use a different email.");
      return;
    }

    try {
      const response = await axios.post("http://192.168.0.106:3000/register", data);
      console.log("User registered:", response.data);
      setMessage("User registered successfully!");
      // Handle success (e.g., navigate to login page)
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4 md:px-8">
      <MobileMenu />
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-center text-3xl font-semibold text-black mb-6">Create Your Account</h2>
        {message && <p className="text-red-500 text-center mb-6">{message}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Username"
              {...register("username", { required: "Username is required" })}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Password must be at least 8 characters" }
              })}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div>
            <button 
              type="submit" 
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              Register
            </button>
          </div>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Already have an account? <a href="#" className="text-indigo-600 hover:underline">Sign In</a>
          </p>
        </div>
      </div>
    </div>
  );
}
