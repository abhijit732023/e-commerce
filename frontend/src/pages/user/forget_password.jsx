// src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ENV_File } from "../../FilesPaths/all_path.js";

export default function ForgotPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      await axios.post(`${ENV_File.backendURL}/forgot-password`, data);
      setMessage("Password reset link sent to your email.");
    } catch (err) {
      setMessage("Error sending reset link. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md bg-white p-6 shadow-md rounded-lg w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
        {message && <p className="text-center text-red-500">{message}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: "Email is required" })}
            className="w-full px-4 py-3 border border-gray-300 rounded-md"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}
