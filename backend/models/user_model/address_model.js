// models/Address.js
import mongoose from 'mongoose'
const addressSchema = new mongoose.Schema({
  userid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user_login",
    required: true,

  },
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  areaStreet: {
    type: String,
    required: true,
  },
  flatNo: {
    type: String,
    required: true,
  },
  landmark: {
    type: String,
  },
  addressType: {
    type: String,
    enum: ["Home", "Work", "Other"],
    default: "Home",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Address_model= mongoose.model("Address", addressSchema);
export default Address_model

{/*
    
    const addressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: String,
  phoneNumber: String,
  pincode: String,
  city: String,
  state: String,
  areaStreet: String,
  flatNo: String,
  landmark: String,
  addressType: {
    type: String,
    enum: ["Home", "Work", "Other"],
    default: "Home",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Address", addressSchema);

    */}