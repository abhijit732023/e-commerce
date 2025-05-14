import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ENV_File } from "../FilesPaths/all_path";

const Address_form = ({ userid, onCancel }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${ENV_File.backendURL}/address/`, {
        ...data,
        userid,
      });
      alert("Address added successfully!");
      reset();
      if (onCancel) onCancel(); // hide form
    } catch (err) {
      console.error(err);
      alert("Failed to save address.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-white p-4 rounded-lg shadow border absolute inset-0 z-50 mt-20" 
    >
      <h2 className="text-xl font-semibold text-center mb-2">Add Address</h2>

      <input
        {...register("name", { required: "Name is required" })}
        placeholder="Full Name"
        className="w-full border px-3 py-2 rounded"
      />
      {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

      <input
        {...register("phoneNumber", {
          required: "Phone number is required",
          pattern: { value: /^[0-9]{10}$/, message: "Invalid phone number" },
        })}
        placeholder="Phone Number"
        className="w-full border px-3 py-2 rounded"
      />
      {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}

      <input
        {...register("pincode", {
          required: "Pincode is required",
          pattern: { value: /^[0-9]{6}$/, message: "Invalid pincode" },
        })}
        placeholder="Pincode"
        className="w-full border px-3 py-2 rounded"
      />
      {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode.message}</p>}

      <input
        {...register("city", { required: "City is required" })}
        placeholder="City"
        className="w-full border px-3 py-2 rounded"
      />
      <input
        {...register("state", { required: "State is required" })}
        placeholder="State"
        className="w-full border px-3 py-2 rounded"
      />
      <input
        {...register("areaStreet", { required: "Street is required" })}
        placeholder="Area / Street"
        className="w-full border px-3 py-2 rounded"
      />
      <input
        {...register("flatNo", { required: "Flat No. is required" })}
        placeholder="Flat / House No."
        className="w-full border px-3 py-2 rounded"
      />
      <input
        {...register("landmark")}
        placeholder="Landmark (Optional)"
        className="w-full border px-3 py-2 rounded"
      />
      <select
        {...register("addressType", { required: "Select address type" })}
        className="w-full border px-3 py-2 rounded"
      >
        <option value="">-- Select Address Type --</option>
        <option value="Home">Home</option>
        <option value="Work">Work</option>
        <option value="Other">Other</option>
      </select>
      {errors.addressType && <p className="text-red-500 text-sm">{errors.addressType.message}</p>}

      <div className="flex gap-4">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Address_form;
