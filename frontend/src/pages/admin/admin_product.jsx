import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ENV_File } from "../../FilesPaths/all_path";
import axios from "axios";

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'CUSTOM-SIZE'];
const CATEGORIES = ['Regular', 'Premium', 'SSspecial'];
const STOCK_STATUSES = ['In Stock', 'Out of Stock'];

const sampleData = {
  header: "Sample Product Title",
  description: "This is a sample description of the product.",
  price: 199.99,
  fakePrie: 299.99,
  wholeSaleQuantity: 50,
  WholeSalePrice: 179.99,
  category: "Regular",
  inStockStatus: "In Stock",
  dateToDeliver: "2025-05-10",
  tags: "sample,example,product",
  color: "Red",
  size: ["XS", "S"],
  images: [],
};

const ProductForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: sampleData
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [popup, setPopup] = useState({ show: false, type: "", message: "" });

  // Handle image file input
  const handleImageChange = (e) => {
    setImageFiles(e.target.files);
  };

  // Handle sizes (checkbox group)
  const selectedSizes = watch('size') || [];
  const handleSizeChange = (e) => {
    const { value, checked } = e.target;
    let updatedSizes = Array.isArray(selectedSizes) ? [...selectedSizes] : [];
    if (checked) {
      updatedSizes.push(value);
    } else {
      updatedSizes = updatedSizes.filter((s) => s !== value);
    }
    setValue('size', updatedSizes);
  };

  // Form submit
  const onSubmit = async (data) => {
    setPopup({ show: false, type: "", message: "" });

    // Prepare data as per schema
    const payload = {
      header: data.header,
      description: data.description,
      price: Number(data.price),
      fakePrie: Number(data.fakePrie),
      inStockStatus: data.inStockStatus,
      wholeSaleQuantity: Number(data.wholeSaleQuantity),
      WholeSalePrice: Number(data.WholeSalePrice),
      category: data.category,
      dateToDeliver: data.dateToDeliver,
      size: data.size ? (Array.isArray(data.size) ? data.size : [data.size]) : [],
      tags: typeof data.tags === "string" ? data.tags.split(",").map(t => t.trim()) : [],
      color: data.color,
      images: [], // Images will be handled below
    };

    // Prepare FormData for images
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => formData.append(key, v));
      } else {
        formData.append(key, value);
      }
    });
    if (imageFiles && imageFiles.length > 0) {
      for (let file of imageFiles) {
        formData.append("images", file);
      }
    }

    try {
      await axios.post(`${ENV_File.backendURL}/admin/product/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setPopup({ show: true, type: "success", message: "Product added successfully!" });
      reset(sampleData);
      setImageFiles([]);
      setTimeout(() => setPopup({ show: false, type: "", message: "" }), 2500);
    } catch (error) {
      setPopup({
        show: true,
        type: "error",
        message:
          error.response?.data?.message ||
          "Error adding product. Please check your input and try again.",
      });
      setTimeout(() => setPopup({ show: false, type: "", message: "" }), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-rose-50">
      <div className="w-full max-w-2xl h-[100vh] bg-white rounded-3xl shadow-2xl p-0 border border-rose-200 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="w-full py-6 px-8 bg-gradient-to-r from-rose-500 via-amber-300 to-rose-300 rounded-t-3xl shadow text-center">
          <h2 className="text-3xl font-bold text-white tracking-wide drop-shadow">
            Add New Product
          </h2>
        </div>

        {/* Popup */}
        {popup.show && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div
              className={`rounded-2xl px-8 py-6 shadow-2xl border-2 ${
                popup.type === "success"
                  ? "bg-green-50 border-green-400"
                  : "bg-rose-50 border-rose-400"
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <span
                  className={`text-4xl ${
                    popup.type === "success" ? "text-green-500" : "text-rose-500"
                  }`}
                >
                  {popup.type === "success" ? "✔️" : "❌"}
                </span>
                <span
                  className={`font-semibold text-lg ${
                    popup.type === "success" ? "text-green-700" : "text-rose-700"
                  }`}
                >
                  {popup.message}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Scrollable Form */}
        <div className="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Product Title */}
            <div>
              <label className="block font-semibold mb-1 text-rose-600">Product Title</label>
              <input
                {...register("header", { required: "Product title is required" })}
                placeholder="Product Title"
                className="w-full border border-rose-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-rose-300 bg-rose-50"
              />
              {errors.header && <p className="text-rose-500 text-xs mt-1">{errors.header.message}</p>}
            </div>
            {/* Description */}
            <div>
              <label className="block font-semibold mb-1 text-rose-600">Description</label>
              <textarea
                {...register("description", { required: "Description is required" })}
                placeholder="Description"
                className="w-full border border-rose-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-rose-300 bg-rose-50"
                rows={3}
              />
              {errors.description && (
                <p className="text-rose-500 text-xs mt-1">{errors.description.message}</p>
              )}
            </div>
            {/* Price & Fake Price */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block font-semibold mb-1 text-rose-600">Price</label>
                <input
                  {...register("price", { required: "Price is required", valueAsNumber: true })}
                  type="number"
                  placeholder="Price"
                  className="w-full border border-rose-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-amber-300 bg-amber-50"
                />
                {errors.price && <p className="text-rose-500 text-xs mt-1">{errors.price.message}</p>}
              </div>
              <div className="flex-1">
                <label className="block font-semibold mb-1 text-rose-600">Fake Price (MRP)</label>
                <input
                  {...register("fakePrie", { required: "Fake Price is required", valueAsNumber: true })}
                  type="number"
                  placeholder="Fake Price"
                  className="w-full border border-rose-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-amber-300 bg-amber-50"
                />
                {errors.fakePrie && (
                  <p className="text-rose-500 text-xs mt-1">{errors.fakePrie.message}</p>
                )}
              </div>
            </div>
            {/* Discount (auto-calculated, disabled) */}
            <div>
              <label className="block font-semibold mb-1 text-rose-600">Discount (%)</label>
              <input
                type="number"
                value={
                  watch("fakePrie") && watch("price")
                    ? Math.round(
                        ((Number(watch("fakePrie")) - Number(watch("price"))) /
                          Number(watch("fakePrie"))) *
                          100
                      )
                    : ""
                }
                disabled
                className="w-full border border-rose-200 rounded-lg p-2 bg-gray-100 text-gray-500"
              />
            </div>
            {/* Wholesale Quantity & Price */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block font-semibold mb-1 text-amber-700">Wholesale Quantity</label>
                <input
                  {...register("wholeSaleQuantity", { required: true, valueAsNumber: true })}
                  type="number"
                  placeholder="Wholesale Quantity"
                  className="w-full border border-amber-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-amber-300 bg-amber-50"
                />
              </div>
              <div className="flex-1">
                <label className="block font-semibold mb-1 text-amber-700">Wholesale Price</label>
                <input
                  {...register("WholeSalePrice", { required: true, valueAsNumber: true })}
                  type="number"
                  placeholder="Wholesale Price"
                  className="w-full border border-amber-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-amber-300 bg-amber-50"
                />
              </div>
            </div>
            {/* Category & Stock */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block font-semibold mb-1 text-rose-600">Category</label>
                <select
                  {...register("category", { required: true })}
                  className="w-full border border-rose-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-rose-300 bg-rose-50"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label className="block font-semibold mb-1 text-rose-600">Stock Status</label>
                <select
                  {...register("inStockStatus", { required: true })}
                  className="w-full border border-rose-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-rose-300 bg-rose-50"
                >
                  {STOCK_STATUSES.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>
            {/* Delivery Date */}
            <div>
              <label className="block font-semibold mb-1 text-amber-700">Delivery Date</label>
              <input
                {...register("dateToDeliver", { required: true })}
                type="date"
                className="w-full border border-amber-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-amber-300 bg-amber-50"
              />
            </div>
            {/* Tags & Color */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block font-semibold mb-1 text-rose-600">Tags (comma separated)</label>
                <input
                  {...register("tags")}
                  type="text"
                  placeholder="e.g. summer, casual, trending"
                  className="w-full border border-rose-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-rose-300 bg-rose-50"
                />
              </div>
              <div className="flex-1">
                <label className="block font-semibold mb-1 text-rose-600">Color</label>
                <input
                  {...register("color")}
                  type="text"
                  placeholder="Color"
                  className="w-full border border-rose-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-rose-300 bg-rose-50"
                />
              </div>
            </div>
            {/* Sizes */}
            <div>
              <label className="block font-semibold mb-1 text-amber-700">Sizes</label>
              <div className="flex flex-wrap gap-4">
                {SIZES.map((size) => (
                  <label key={size} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      value={size}
                      checked={selectedSizes.includes(size)}
                      onChange={handleSizeChange}
                      className="form-checkbox accent-rose-500"
                    />
                    <span className="text-sm text-rose-700">{size}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* Images */}
            <div>
              <label className="block font-semibold mb-1 text-rose-600">Product Images</label>
              <input
                id="images"
                {...register("images")}
                type="file"
                multiple
                onChange={handleImageChange}
                className="w-full p-2 border border-rose-200 rounded-lg bg-rose-50"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {imageFiles &&
                  Array.from(imageFiles).map((file, idx) => (
                    <span
                      key={idx}
                      className="inline-block bg-amber-100 text-rose-700 px-3 py-1 rounded-full text-xs font-semibold"
                    >
                      {file.name}
                    </span>
                  ))}
              </div>
            </div>
            <button
              type="submit"
              className={`w-full bg-gradient-to-r from-rose-500 via-amber-400 to-rose-400 hover:from-rose-600 hover:to-amber-500 transition text-white py-3 px-4 rounded-xl font-bold text-lg shadow-lg mt-4 flex items-center justify-center ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                  Adding Product...
                </>
              ) : (
                "Add Product"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;