import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    header: { type: String, required: true }, // Product title
    description: { type: String, required: true }, // Description
    price: { type: Number, required: true }, // Original price (cost to seller)
    fakePrie: { type: Number, required: true }, // MRP shown to customer
    discount: {
      type: Number,
      default: function () {
        return Math.round(
          ((this.fakePrie - this.price) / this.fakePrie) * 100
        );
      },
    }, // Discount percentage
    inStockStatus: {
      type: String,
      enum: ["In Stock", "Out of Stock"],
      default: "In Stock",
    }, // InStock/OutStock status
    wholeSaleQuantity: { type: Number, required: true }, // Whole quantity
    WholeSalePrice: { type: Number, required: true },
    category: {
      type: String,
      required: true,
      enum: ['Regular', 'Premium', 'SSspecial']
    }, // Category
    dateToDeliver: { type: Date, required: true }, // Delivery
    size: {
      type: [String], // Change to an array of strings
      required: true,
      enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL',"CUSTOM-SIZE"]
    }, // Sizes for the product // Size for custom items
    tags: [String], // Tags for the product
    color: { type: String }, // Product color
    images: [String], // Product images URLs

  },
  { timestamps: true }
);

const product_add_model = mongoose.model("Product", productSchema);
export default product_add_model;
