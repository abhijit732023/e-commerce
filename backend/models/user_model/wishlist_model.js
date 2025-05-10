import mongoose from "mongoose";

const Wishlist_Shema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user_login",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    header: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    buyingMehtod: {
      type: String,
      enum: ['Retail','Wholesale'],
      default:'Retail',
    },
    size: {
      type: String,
      enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'CUSTOM-SIZE'],
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      required: true,
      default: 'pending',
    },
  },
  { timestamps: true }
);

const Wishlist_model = mongoose.model("Wishlist", Wishlist_Shema);
export default Wishlist_model;
