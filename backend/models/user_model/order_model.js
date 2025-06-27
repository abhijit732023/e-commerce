import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
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
      enum: ['Retail', 'Wholesale'],
      default: 'Retail',
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
    addressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
    cancelOrder: {
      type: String,
      enum: ["yes", "no"],
      default: "no"
    },
    cancelReason: {
      type: String,
      default: "default"
    }

  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
export default Order;
