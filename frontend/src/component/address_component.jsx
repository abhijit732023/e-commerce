import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Container, ENV_File } from "../FilesPaths/all_path";

const AddressCard = ({ userid,addressid }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formdata, setFormData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editAddressId, setEditAddressId] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      phoneNumber: "",
      pincode: "",
      city: "",
      state: "",
      areaStreet: "",
      flatNo: "",
      landmark: "",
      addressType: "Home",
    },
  });


  // Fetch addresses
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axios.get(`${ENV_File.backendURL}/address`);
        if (response.data && response.data.data.length > 0) {
          setFormData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };

    fetchAddress();
  }, []);

  // Handle delete
  const handleDelete = async (addressId) => {
    try {
      const response = await axios.delete(`${ENV_File.backendURL}/address/${addressId}`);
      alert("Address deleted successfully!");
      setFormData((prev) => prev.filter((item) => item._id !== addressId));
    } catch (error) {
      console.error("Error deleting address:", error);
      alert("An error occurred while deleting the address.");
    }
  };

  // Handle edit
  const handleEdit = (address) => {
    setIsFormVisible(true);
    setIsEdit(true);
    setEditAddressId(address._id);

    // Prefill form
    Object.entries(address).forEach(([key, value]) => {
      if (value !== undefined) setValue(key, value);
    });
  };

  // Handle submit
  const onSubmit = async (data) => {
    try {
      if (isEdit && editAddressId) {
        const response = await axios.put(
          `${ENV_File.backendURL}/address/${editAddressId}`,
          { ...data, userid }
        );
        alert("Address updated successfully!");
        setFormData((prev) =>
          prev.map((item) =>
            item._id === editAddressId ? response.data.data : item
          )
        );
      } else {
        const response = await axios.post(`${ENV_File.backendURL}/address`, {
          ...data,
          userid,
        });
        alert("Address added successfully!");
        setFormData((prev) => [...prev, response.data.data]);
      }

      reset();
      setIsFormVisible(false);
      setIsEdit(false);
      setEditAddressId(null);
    } catch (error) {
      console.error("Error submitting address:", error);
      alert("An error occurred while submitting the address.");
    }
  };

  return (
          <div className="p-4  min-w-full min-h-screen relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Your Addresses</h2>
        <button
          onClick={() => {
            setIsFormVisible(true);
            setIsEdit(false);
            setEditAddressId(null);
            reset();
          }}
          className="text-blue-600 mt-10 font-medium hover:underline"
        >
          + Add Address
        </button>
      </div>

      {/* Address Cards */}
      <div className="space-y-4">
        {formdata.map((address) => (
          <div key={address._id} className="bg-white p-4 rounded-lg shadow border">

            <div className="flex items-center justify-end gap-2 mb-2 w-full bg-red-300">
              <button  className="" onClick={()=>addressid(address._id)}>use</button>
              
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-md">
                {address.addressType.toUpperCase()}
              </span>
              <span className="font-semibold text-gray-800">{address.name}</span>
            </div>

            <p className="text-sm text-gray-700 leading-relaxed">
              {address.flatNo}, {address.areaStreet}
              {address.landmark ? `, ${address.landmark}` : ""},<br />
              {address.city}, {address.state}, India - {address.pincode}
            </p>

            <p className="text-sm text-gray-700 mt-2">
              Phone: <span className="font-semibold">{address.phoneNumber}</span>
            </p>

            <div className="mt-4 border-t pt-3 flex gap-6 text-sm">
              <button
                onClick={() => handleDelete(address._id)}
                className="text-red-600 font-medium hover:underline"
              >
                Delete
              </button>
              <button
                onClick={() => handleEdit(address)}
                className="text-blue-600 font-medium hover:underline"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Address Form */}
      {isFormVisible && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg overflow-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold mb-4">
              {isEdit ? "Edit Address" : "Add New Address"}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {[
                { label: "Full Name", name: "name", placeholder: "John Doe" },
                {
                  label: "Phone Number",
                  name: "phoneNumber",
                  placeholder: "9876543210",
                  validation: {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Invalid phone number",
                    },
                  },
                },
                {
                  label: "Pincode",
                  name: "pincode",
                  placeholder: "110001",
                  validation: {
                    required: "Pincode is required",
                    pattern: {
                      value: /^[0-9]{6}$/,
                      message: "Invalid pincode",
                    },
                  },
                },
                { label: "City", name: "city", placeholder: "New Delhi" },
                { label: "State", name: "state", placeholder: "Delhi" },
                {
                  label: "Area / Street",
                  name: "areaStreet",
                  placeholder: "Connaught Place",
                },
                {
                  label: "Flat / House No.",
                  name: "flatNo",
                  placeholder: "B-102",
                },
                {
                  label: "Landmark (Optional)",
                  name: "landmark",
                  placeholder: "Near Metro Station",
                  validation: {},
                },
              ].map(({ label, name, placeholder, validation = {} }) => (
                <div key={name}>
                  <label className="block text-sm font-semibold mb-1">
                    {label}
                  </label>
                  <input
                    {...register(name, {
                      required: !label.includes("Optional") && `${label} is required`,
                      ...validation,
                    })}
                    placeholder={placeholder}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                  {errors[name] && (
                    <p className="text-red-500 text-sm">
                      {errors[name].message}
                    </p>
                  )}
                </div>
              ))}

              {/* Address Type */}
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Address Type
                </label>
                <select
                  {...register("addressType", { required: "Select address type" })}
                  className="w-full px-3 py-2 border rounded-lg bg-white"
                >
                  <option value="Home">Home</option>
                  <option value="Work">Work</option>
                  <option value="Other">Other</option>
                </select>
                {errors.addressType && (
                  <p className="text-red-500 text-sm">{errors.addressType.message}</p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsFormVisible(false);
                    setIsEdit(false);
                    setEditAddressId(null);
                    reset();
                  }}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  {isEdit ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>

  );
};

export default AddressCard;
