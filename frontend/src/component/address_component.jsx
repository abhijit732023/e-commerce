import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Container, ENV_File } from "../FilesPaths/all_path";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const AddressCard = ({ userid, addressid }) => {
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
          const userbasedAddress = response.data.data.filter(
            (address) => address.userid === userid
          );
          setFormData(userbasedAddress);
        }
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };

    fetchAddress();
  }, [userid]);

  // Handle delete
  const handleDelete = async (addressId) => {
    try {
      const response = await axios.delete(
        `${ENV_File.backendURL}/address/${addressId}`
      );
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
    <Container>
    <div className=" relative  h-full overflow-y-scroll  p-4 min-w-full ">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-rose-700 tracking-wide">Your Addresses</h2>
        <button
          onClick={() => {
            setIsFormVisible(true);
            setIsEdit(false);
            setEditAddressId(null);
            reset();
          }}
          className="bg-rose-600 text-white px-4 py-2 rounded-lg shadow hover:bg-rose-700 transition-all duration-150 font-semibold"
        >
          + Add Address
        </button>
      </div>

      {/* Address Cards */}
      <div className="space-y-6">
        {formdata.length === 0 && (
          <div className="text-center text-gray-400 text-base py-10">
            No addresses found. Please add a new address.
          </div>
        )}
        {formdata.map((address) => (
          <motion.div
            key={address._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 120 }}
            className="bg-white p-5 rounded-2xl shadow-lg border border-rose-100 hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow ${address.addressType === "Home"
                ? "bg-green-600 text-white"
                : address.addressType === "Work"
                  ? "bg-blue-600 text-white"
                  : "bg-yellow-500 text-white"
                }`}>
                {address.addressType.toUpperCase()}
              </span>
              <span className="font-semibold text-gray-800 text-lg">{address.name}</span>
            </div>

            <p className="text-sm text-gray-700 leading-relaxed mb-1">
              {address.flatNo}, {address.areaStreet}
              {address.landmark ? `, ${address.landmark}` : ""},<br />
              {address.city}, {address.state}, India - {address.pincode}
            </p>

            <p className="text-sm text-gray-700 mt-2">
              <span className="font-semibold">Phone:</span> {address.phoneNumber}
            </p>

            <div className="flex justify-between mt-4 border-t pt-3 gap-6 text-sm">
              <div className="flex gap-6">
                <button
                  onClick={() => handleDelete(address._id)}
                  className="text-red-600 font-semibold hover:underline hover:text-red-800 transition"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEdit(address)}
                  className="text-blue-600 font-semibold hover:underline hover:text-blue-800 transition"
                >
                  Edit
                </button>
              </div>
              <div className="flex items-center pr-1 justify-end w-full">
                <button
                  className="bg-rose-100 text-rose-700 px-4 py-1 rounded-lg font-semibold hover:bg-rose-200 transition"
                  onClick={() => addressid(address._id)}
                >
                  Use Address
                </button>
              </div>
              
            </div>
            <Link to={-1} className="absolute z-50">back</Link>
            
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Address Form with Animation */}
      <AnimatePresence>
        {isFormVisible && (
          <motion.div
            className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white w-full max-w-lg  rounded-md shadow-2xl min-h-[70vh] border border-gray-200 relative"
              initial={{ scale: 0.8, opacity: 0, y: 100 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 100 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <button
                type="button"
                onClick={() => {
                  setIsFormVisible(false);
                  setIsEdit(false);
                  setEditAddressId(null);
                  reset();
                }}
                className="absolute top-4 right-4 text-gray-400 hover:text-rose-600 text-2xl font-bold transition"
                aria-label="Close"
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold mb-6 text-rose-700 text-center tracking-wide">
                {isEdit ? "Edit Address" : "Add New Address"}
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 h-[78vh] overflow-y-scroll p-4">
                {[
                  { label: "Full Name", name: "name", placeholder: "Ex: John Doe" },
                  {
                    label: "Phone Number",
                    name: "phoneNumber",
                    placeholder: "Ex: 9876543210",
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
                    placeholder: "Ex: 110001",
                    validation: {
                      required: "Pincode is required",
                      pattern: {
                        value: /^[0-9]{6}$/,
                        message: "Invalid pincode",
                      },
                    },
                  },
                  { label: "City", name: "city", placeholder: "Ex: New Delhi" },
                  { label: "State", name: "state", placeholder: "Ex: Delhi" },
                  {
                    label: "Area / Street",
                    name: "areaStreet",
                    placeholder: "Ex: Area 51, Street 2",
                  },
                  {
                    label: "Flat / House No.",
                    name: "flatNo",
                    placeholder: "Ex: B-102",
                  },
                  {
                    label: "Landmark (Optional)",
                    name: "landmark",
                    placeholder: "Ex: Near Metro Station",
                    validation: {},
                  },
                ].map(({ label, name, placeholder, validation = {} }) => (
                  <div key={name} className="flex flex-col gap-1">
                    <label className="block text-sm font-semibold mb-1 text-gray-700">
                      {label}
                    </label>
                    <input
                      {...register(name, {
                        required:
                          !label.includes("Optional") && `${label} is required`,
                        ...validation,
                      })}
                      placeholder={placeholder}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 transition-all duration-150 shadow-sm bg-gray-100"
                    />
                    {errors[name] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors[name].message}
                      </p>
                    )}
                  </div>
                ))}

                {/* Address Type */}
                <div className="flex flex-col gap-1">
                  <label className="block text-sm font-semibold mb-1 text-gray-700">
                    Address Type
                  </label>
                  <select
                    {...register("addressType", {
                      required: "Select address type",
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 transition-all duration-150 shadow-sm"
                  >
                    <option value="Home">Home</option>
                    <option value="Work">Work</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.addressType && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.addressType.message}
                    </p>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-4 pt-4 border-t border-gray-200 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setIsFormVisible(false);
                      setIsEdit(false);
                      setEditAddressId(null);
                      reset();
                    }}
                    className="bg-gray-400 text-white px-5 py-2 rounded-lg hover:bg-gray-700 transition-all duration-150 shadow"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-rose-600 text-white px-6 py-2 rounded-lg hover:bg-rose-700 transition-all duration-150 shadow font-semibold"
                  >
                    {isEdit ? "Update" : "Save"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </Container>
  );
};

export default AddressCard;