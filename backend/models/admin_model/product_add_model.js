import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  header: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  brand: { type: String },
  originalPrice: { type: Number, required: true }, // MRP
  discountedPrice: { type: Number, required: true }, // Selling price
  discountPercent: {
    type: Number,
    default: function () {
      return Math.round(
        ((this.originalPrice - this.discountedPrice) / this.originalPrice) * 100
      );
    }
  },
  size: { type: String },
  availableSizes: [{
    type: String,
    enum: ["XS", "S", "M", "L", "XL", "XXL","custom-size"]
  }],
  quantity: { type: Number, required: true },
  color: { type: String },
  tags: [String],
  images: [String],
  dateToDeliver: { type: Date, required: true },
  inStock: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  rating: { type: Number, default: 0 },
  // sku: { type: String, unique: true, sparse: true },
}, {
  timestamps: true
});

const product_add_model = mongoose.model('Product', productSchema);
export default product_add_model