import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AppwriteService, ENV_File } from "../../FilesPaths/all_path";
import axios from "axios";

const ProductForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [popup, setPopup] = useState({ show: false, type: "", message: "" });
  const [isAdding, setIsAdding] = useState(false); // <-- NEW STATE

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
    tags: ["sample", "example", "product"],
    color: "Red",
    size: ["XS", "S"],
    images: ["imageId1", "imageId2"],
  };

  const handleImageChange = (e) => {
    setImageFiles(e.target.files);
  };

  const uploadImages = async (files) => {
    const fileIds = [];
    for (let file of files) {
      try {
        const fileId = await AppwriteService.uploadFile(file);
        fileIds.push(fileId.$id);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
    return fileIds;
  };

  const onSubmit = async (data) => {
    setIsAdding(true); // <-- SET LOADING
    try {
      const imageIds = await uploadImages(imageFiles);

      if (selectedSizes.length === 0) {
        setPopup({ show: true, type: "error", message: "Please select at least one size." });
        setIsAdding(false);
        return;
      }

      const payload = {
        ...data,
        size: selectedSizes,
        images: imageIds,
        tags: typeof data.tags === "string" ? data.tags.split(",").map((t) => t.trim()) : data.tags,
      };

      await axios.post(`${ENV_File.backendURL}/admin/create`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      setPopup({ show: true, type: "success", message: "Product added successfully!" });
      reset();
      setSelectedSizes([]);
      setImageFiles([]);
      setIsAdding(false); // <-- RESET LOADING
      setTimeout(() => setPopup({ show: false, type: "", message: "" }), 2500);
    } catch (error) {
      setPopup({
        show: true,
        type: "error",
        message:
          error.response?.data?.message ||
          "Error adding product. Please check your input and try again.",
      });
      setIsAdding(false); // <-- RESET LOADING
      setTimeout(() => setPopup({ show: false, type: "", message: "" }), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-rose-50">
      <div className="w-full max-w-2xl h-[100vh] bg-white rounded-3xl shadow-2xl p-0 border border-rose-200 flex flex-col overflow-hidden">
        {/* Header with theme gradient */}
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
            {/* ...all your form fields... */}

            <button
              type="submit"
              className={`w-full bg-gradient-to-r from-rose-500 via-amber-400 to-rose-400 hover:from-rose-600 hover:to-amber-500 transition text-white py-3 px-4 rounded-xl font-bold text-lg shadow-lg mt-4 flex items-center justify-center ${
                isAdding ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={isAdding}
            >
              {isAdding ? (
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