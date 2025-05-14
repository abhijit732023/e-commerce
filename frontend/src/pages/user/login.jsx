import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth, ENV_File, Container } from "../../FilesPaths/all_path.js";
import { Link, useNavigate } from "react-router-dom";

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
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-100 to-gray-300">
        <main className="flex-grow flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-white shadow-2xl rounded-lg p-8">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
              Welcome Back
            </h2>
            {message && (
              <p
                className={`text-center mb-4 ${
                  isSuccess ? "text-green-500" : "text-red-500"
                }`}
              >
                {message}
              </p>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email", { required: "Email is required" })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Login
              </button>

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
              <Link to="/register" className="text-blue-600 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </main>

        <footer className="bg-gray-800 text-white pb-8 py-4">
          <div className="text-center text-sm">
            <p>© 2025 SS Collection. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Container>
  );
}
