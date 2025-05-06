import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  header: { type: String, required: true },
  brand: { type: String, required: true },
  originalPrice: { type: Number, required: true },
  discountedPrice: { type: Number, required: true },
  category: { type: String, required: true },
  color: { type: String, required: true },
  quantity: { type: Number, required: true },
  availableSizes: { type: [String], required: true }, // ["S", "M", ...]
  tags: { type: [String], default: [] }, // ["trendy", "summer"]
  dateToDeliver: { type: Date, required: true },
  inStock: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  description: { type: String, required: true },
  images: { type: [String], default: [] } // Array of Appwrite file IDs or URLs
}, {
  timestamps: true,
});

const Product_model_2 = mongoose.model("Add", productSchema);
export default Product_model_2;
