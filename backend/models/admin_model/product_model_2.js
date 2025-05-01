import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: Number,
  description: String,
  imageUrls: [String], // Array of image URLs
});

const Product_model_2 = mongoose.model('Add', productSchema);
export default Product_model_2
