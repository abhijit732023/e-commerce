import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  mobileNumber: {
    type: Number,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'], // Only allows 'user' or 'admin' as role values
    default: 'user', // Default to 'user' if no role is specified
  }
});

const user_register_model = mongoose.model("user_login", userSchema);

export default user_register_model;
