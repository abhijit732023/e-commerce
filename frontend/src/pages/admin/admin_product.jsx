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
  } = useForm();
    const [selectedSizes, setSelectedSizes] = useState([]);

  const [imageFiles, setImageFiles] = useState([]);

  const sampleData = {
  "header": "Sample Product Title",
  "description": "This is a sample description of the product.",
  "price": 199.99,
  "fakePrie": 299.99,
  "wholeSaleQuantity": 50,
  "WholeSalePrice": 179.99,
  "category": "Regular",
  "inStockStatus": "In Stock",
  "dateToDeliver": "2025-05-10",
  "tags": ["sample", "example", "product"],
  "color": "Red",
  "size": ["XS", "S"], // Array of sizes
  "images": ["imageId1", "imageId2"]
}

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
  console.log("Form data:", data);

  try {
    const imageIds = await uploadImages(imageFiles);

    // Ensure at least one size is selected
    if (selectedSizes.length === 0) {
      console.error("No sizes selected. Please select at least one size.");
      return;
    }

    const payload = {
      ...data,
      size: selectedSizes, // Use selectedSizes for sizes
      images: imageIds,
    };

    console.log("Payload to send:", payload);

    const response = await axios.post(`${ENV_File.backendURL}/admin/create`, payload, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("Product added successfully:", response.data);
  } catch (error) {
    if (error.response) {
      console.error("Backend error:", error.response.data);
    } else {
      console.error("Error adding product:", error);
    }
  }
};

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Header */}
        <input
          {...register("header", { required: "Product title is required" })}
          defaultValue={sampleData.header}
          placeholder="Product Title"
          className="w-full border p-2"
        />
        {errors.header && <p className="text-red-500">{errors.header.message}</p>}

        {/* Description */}
        <textarea
          {...register("description", { required: "Description is required" })}
          defaultValue={sampleData.description}
          placeholder="Description"
          className="w-full border p-2"
        />
        {errors.description && <p className="text-red-500">{errors.description.message}</p>}

        {/* Price */}
        <input
          {...register("price", { required: "Price is required", valueAsNumber: true })}
          type="number"
          defaultValue={sampleData.price}
          placeholder="Price"
          className="w-full border p-2"
        />
        {errors.price && <p className="text-red-500">{errors.price.message}</p>}

        {/* Fake Price */}
        <input
          {...register("fakePrie", { required: "Fake Price is required", valueAsNumber: true })}
          type="number"
          defaultValue={sampleData.fakePrie}
          placeholder="Fake Price"
          className="w-full border p-2"
        />
        {errors.fakePrie && <p className="text-red-500">{errors.fakePrie.message}</p>}

        {/* Wholesale Quantity */}
        <input
          {...register("wholeSaleQuantity", { required: true, valueAsNumber: true })}
          type="number"
          defaultValue={sampleData.wholeSaleQuantity}
          placeholder="Wholesale Quantity"
          className="w-full border p-2"
        />

        {/* Wholesale Price */}
        <input
          {...register("WholeSalePrice", { required: true, valueAsNumber: true })}
          type="number"
          defaultValue={sampleData.WholeSalePrice}
          placeholder="Wholesale Price"
          className="w-full border p-2"
        />

        {/* Category */}
        <select {...register("category", { required: true })} defaultValue={sampleData.category} className="w-full border p-2">
          <option value="Regular">Regular</option>
          <option value="Premium">Premium</option>
          <option value="SSspecial">SSspecial</option>
        </select>

        {/* In Stock Status */}
        <select {...register("inStockStatus", { required: true })} defaultValue={sampleData.inStockStatus} className="w-full border p-2">
          <option value="In Stock">In Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>

        {/* Delivery Date */}
        <input
          {...register("dateToDeliver", { required: true })}
          type="date"
          defaultValue={sampleData.dateToDeliver}
          className="w-full border p-2"
        />

        {/* Tags */}
        <input
          {...register("tags")}
          type="text"
          defaultValue={sampleData.tags}
          placeholder="Tags"
          className="w-full border p-2"
        />

        {/* Color */}
        <input
          {...register("color")}
          type="text"
          defaultValue={sampleData.color}
          placeholder="Color"
          className="w-full border p-2"
        />

        {/* Sizes */}
        {/* Sizes */}
        <div>
          <label className="block mb-1 font-medium">Sizes</label>
          <div className="flex flex-wrap gap-4">
            {["XS", "S", "M", "L", "XL", "XXL","CUSTOM-SIZE"].map((size) => (
              <label key={size} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={size}
                  checked={selectedSizes.includes(size)} // Use selectedSizes state
                  onChange={(e) => {
                    const { value, checked } = e.target;
                    if (checked) {
                      setSelectedSizes((prev) => [...prev, value]);
                    } else {
                      setSelectedSizes((prev) => prev.filter((s) => s !== value));
                    }
                  }}
                  className="form-checkbox"
                />
                {size}
              </label>
            ))}
          </div>
        </div>



        {/* Images */}
        <input
          id="images"
          {...register("images")}
          type="file"
          multiple
          onChange={handleImageChange}
          className="w-full p-2"
        />

        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
