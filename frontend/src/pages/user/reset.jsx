// src/pages/ResetPassword.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ENV_File } from "../../FilesPaths/all_path.js";

export default function ResetPassword() {
  const { token } = useParams();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      await axios.post(`${ENV_File.backendURL}/reset-password`, { ...data, token });
      setMessage("Password has been reset. You can now log in.");
    } catch (err) {
      setMessage("Invalid or expired token.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md bg-white p-6 shadow-md rounded-lg w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
        {message && <p className="text-center text-red-500">{message}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="password"
            placeholder="New Password"
            {...register("password", { required: "Password is required" })}
            className="w-full px-4 py-3 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
          >
            Set New Password
          </button>
        </form>
      </div>
    </div>
  );
}
