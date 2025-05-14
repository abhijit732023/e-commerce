import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth, MobileMenu, ENV_File, Container } from "../../FilesPaths/all_path.js";
import { Link } from "react-router-dom";

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
      const response = await axios.post(`${ENV_File.backendURL}/register`, data);
      console.log("User registered:", response.data);
      setMessage("User registered successfully!");
      // Handle success (e.g., navigate to login page)
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <Container>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 to-gray-300">
        <div className="flex-grow flex items-center justify-center px-4">
          <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Join SS Collection</h2>
            <p className="text-center text-gray-600 mb-6">
              Create an account to explore the latest trends and exclusive offers.
            </p>
            {message && (
              <p className={`text-center mb-4 ${message.includes("successfully") ? "text-green-500" : "text-red-500"}`}>
                {message}
              </p>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  {...register("username", { required: "Username is required" })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email", { required: "Email is required" })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  {...register("mobileNumber", {
                    required: "Mobile number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Mobile number must be 10 digits"
                    }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                {errors.mobileNumber && <p className="text-red-500 text-sm">{errors.mobileNumber.message}</p>}
              </div>


              <div>
                <input
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 8, message: "Password must be at least 8 characters" }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition duration-300"
              >
                Register
              </button>
            </form>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <Link to={'/login'} className="text-indigo-600 hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
        <footer className="bg-gray-800 text-white py-4 pb-8 mb-2">
          <div className="text-center text-sm">
            <p>© 2025 SS Collection. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Container>

  );
}