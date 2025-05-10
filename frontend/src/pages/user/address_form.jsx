import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ENV_File, useAuth } from '../../FilesPaths/all_path';

const AddressForm = () => {
  const { user } = useAuth();
  const [userid, setUserid] = useState('');
  const [Address, setAddress] = useState([]);
  const [isEditing, setIsEditing] = useState(false);


  useEffect(() => {
   try {
     if (user) {
      setUserid(user._id);
      const fetchaddress = async () => {
        const response = await axios.get(`${ENV_File.backendURL}/address/${user._id}`);
        console.log("Address data:", response.data);
        setAddress(response.data);
        if (response.data) {
          setIsEditing(true);
        } else {
          setIsEditing(false);
        }
      }
      fetchaddress();
      
    }
    
   } catch (error) {
    
   }
  }, []);
  console.log("Address:", Address);
  


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
      <div className="w-full max-w-lg ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-6 sm:p-8 rounded-xl shadow-md space-y-5"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800">Add Delivery Address</h2>

          <div>
            <label className="block text-sm font-semibold mb-1">Full Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            defaultValue={Address && Address.length > 0 ? Address[0].name : ''}
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
            defaultValue={Address && Address.length > 0 ? Address[0].phoneNumber : ''}
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
            defaultValue={Address && Address.length > 0 ? Address[0].pincode : ''}
            placeholder="110001"
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">City</label>
          <input
            {...register("city", { required: "City is required" })}
            defaultValue={Address && Address.length > 0 ? Address[0].city : ''}
            placeholder="New Delhi"
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">State</label>
          <input
            {...register("state", { required: "State is required" })}
            defaultValue={Address && Address.length > 0 ? Address[0].state : ''}
            placeholder="Delhi"
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Area / Street</label>
          <input
            {...register("areaStreet", { required: "Area/Street is required" })}
            defaultValue={Address && Address.length > 0 ? Address[0].areaStreet : ''}
            placeholder="Connaught Place"
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.areaStreet && <p className="text-red-500 text-sm">{errors.areaStreet.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Flat / House No.</label>
          <input
            {...register("flatNo", { required: "Flat No. is required" })}
            defaultValue={Address && Address.length > 0 ? Address[0].flatNo : ''}
            placeholder="B-102"
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.flatNo && <p className="text-red-500 text-sm">{errors.flatNo.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Landmark (Optional)</label>
          <input
            {...register("landmark")}
            defaultValue={Address && Address.length > 0 ? Address[0].landmark : ''}
            placeholder="Near Metro Station"
            className="w-full px-3 py-2 border rounded-lg"
          />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Address Type</label>
            <select
              {...register("addressType", { required: "Select address type" })}
              defaultValue={Address && Address.length > 0 ? Address[0].addressType : ''}
              className="w-full px-3 py-2 border rounded-lg bg-white"
            >
              <option value="">-- Select Type --</option>
              <option value="Home">Home</option>
              <option value="Work">Work</option>
              <option value="Other">Other</option>
            </select>
            {errors.addressType && <p className="text-red-500 text-sm">{errors.addressType.message}</p>}
          </div>

          {isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 rounded-lg"
            >
              Edit Address
            </button>
          ) : (
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
            >
              Save Address
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddressForm;
