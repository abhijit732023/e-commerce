import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ENV_File, useAuth } from '../../FilesPaths/all_path';

const AddressForm = () => {
  const { user } = useAuth();
  const [userid, setUserid] = useState('');

  useEffect(() => {
    if (user) {
      setUserid(user._id);
    }
  }, [user]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${ENV_File.backendURL}/address`,
        { ...data, userid }
      );
      console.log("Success:", response.data);
      alert("Address saved successfully!");
      reset();
    } catch (error) {
      console.error("Error saving address:", error);
      alert("Failed to save address.");
    }
  };

  return (
    <div className="w-screen h-screen overflow-y-auto bg-gray-100 flex justify-center">
      <div className="w-full max-w-lg p-4 sm:p-6 md:p-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-6 sm:p-8 rounded-xl shadow-md space-y-5"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800">Add Delivery Address</h2>

          <div>
            <label className="block text-sm font-semibold mb-1">Full Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              placeholder="John Doe"
              className="w-full px-3 py-2 border rounded-lg"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Phone Number</label>
            <input
              {...register("phoneNumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Invalid phone number",
                },
              })}
              placeholder="9876543210"
              className="w-full px-3 py-2 border rounded-lg"
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Pincode</label>
            <input
              {...register("pincode", {
                required: "Pincode is required",
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: "Invalid pincode",
                },
              })}
              placeholder="110001"
              className="w-full px-3 py-2 border rounded-lg"
            />
            {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">City</label>
            <input
              {...register("city", { required: "City is required" })}
              placeholder="New Delhi"
              className="w-full px-3 py-2 border rounded-lg"
            />
            {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">State</label>
            <input
              {...register("state", { required: "State is required" })}
              placeholder="Delhi"
              className="w-full px-3 py-2 border rounded-lg"
            />
            {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Area / Street</label>
            <input
              {...register("areaStreet", { required: "Area/Street is required" })}
              placeholder="Connaught Place"
              className="w-full px-3 py-2 border rounded-lg"
            />
            {errors.areaStreet && <p className="text-red-500 text-sm">{errors.areaStreet.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Flat / House No.</label>
            <input
              {...register("flatNo", { required: "Flat No. is required" })}
              placeholder="B-102"
              className="w-full px-3 py-2 border rounded-lg"
            />
            {errors.flatNo && <p className="text-red-500 text-sm">{errors.flatNo.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Landmark (Optional)</label>
            <input
              {...register("landmark")}
              placeholder="Near Metro Station"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Address Type</label>
            <select
              {...register("addressType", { required: "Select address type" })}
              className="w-full px-3 py-2 border rounded-lg bg-white"
            >
              <option value="">-- Select Type --</option>
              <option value="Home">Home</option>
              <option value="Work">Work</option>
              <option value="Other">Other</option>
            </select>
            {errors.addressType && <p className="text-red-500 text-sm">{errors.addressType.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
          >
            Save Address
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddressForm;
