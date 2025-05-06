import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AppwriteService,ENV_File } from '../../FilesPaths/all_path';
import axios from "axios";

const ProductForm = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [imageFiles, setImageFiles] = useState([]); // Store selected files

  // Sample data for form fields
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
    tags: "sample, example, product",
    color: "Red",
    customSize: "",
  };

  // Handle size checkbox change
  const handleSizeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedSizes((prev) => [...prev, value]);
    } else {
      setSelectedSizes((prev) => prev.filter((size) => size !== value));
    }
  };

  const handleCustomSizeChange = (e) => {
    if (e.target.value === "") {
      setValue("customSize", "");
    }
  };

  // Handle image file change
  const handleImageChange = (e) => {
    setImageFiles(e.target.files); // Store selected files
  };

  // Upload images to Appwrite and get the file IDs
  const uploadImages = async (files) => {
    const fileIds = [];
    for (let file of files) {
      try {
        const fileId = await AppwriteService.uploadFile(file);
        console.log('dileid',fileId);
        fileIds.push(fileId.$id); // Store the Appwrite file ID
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
    return fileIds;
  };

  const onSubmit = async (data) => {
    console.log('data',data);
    
    try {
      // Upload the images to Appwrite and get their IDs
      const imageIds = await uploadImages(imageFiles);

      // Prepare JSON payload to send to the backend
      const payload = {
        header: data.header,
        description: data.description,
        price: data.price,
        fakePrie: data.fakePrie,
        wholeSaleQuantity: data.wholeSaleQuantity,
        WholeSalePrice: data.WholeSalePrice,
        category: data.category,
        inStockStatus: data.inStockStatus,
        dateToDeliver: data.dateToDeliver,
        tags: data.tags,
        color: data.color,
        size: data.customSize,
        sizes: selectedSizes,
        images: imageIds
      };

      // Send JSON data to backend
      const response = await axios.post(`${ENV_File.backendURL}/admin/create`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Product added successfully:", response.data);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Product Header */}
        <div>
          <label htmlFor="header" className="block text-sm font-medium text-gray-700">
            Product Title
          </label>
          <input
            id="header"
            {...register("header", { required: "Product title is required" })}
            type="text"
            defaultValue={sampleData.header} // Sample data
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.header && <span className="text-red-500">{errors.header.message}</span>}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            {...register("description", { required: "Description is required" })}
            rows="3"
            defaultValue={sampleData.description} // Sample data
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.description && <span className="text-red-500">{errors.description.message}</span>}
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            id="price"
            {...register("price", { required: "Price is required", valueAsNumber: true })}
            type="number"
            defaultValue={sampleData.price} // Sample data
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.price && <span className="text-red-500">{errors.price.message}</span>}
        </div>

        {/* Fake Price */}
        <div>
          <label htmlFor="fakePrice" className="block text-sm font-medium text-gray-700">
            Fake Price
          </label>
          <input
            id="fakePrice"
            {...register("fakePrie", { required: "Fake Price is required", valueAsNumber: true })}
            type="number"
            defaultValue={sampleData.fakePrie} // Sample data
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.fakePrie && <span className="text-red-500">{errors.fakePrie.message}</span>}
        </div>

        {/* Wholesale Quantity */}
        <div>
          <label htmlFor="wholeSaleQuantity" className="block text-sm font-medium text-gray-700">
            Wholesale Quantity
          </label>
          <input
            id="wholeSaleQuantity"
            {...register("wholeSaleQuantity", { required: "Wholesale quantity is required", valueAsNumber: true })}
            type="number"
            defaultValue={sampleData.wholeSaleQuantity} // Sample data
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.wholeSaleQuantity && <span className="text-red-500">{errors.wholeSaleQuantity.message}</span>}
        </div>

        {/* Wholesale Price */}
        <div>
          <label htmlFor="WholeSalePrice" className="block text-sm font-medium text-gray-700">
            Wholesale Price
          </label>
          <input
            id="WholeSalePrice"
            {...register("WholeSalePrice", { required: "Wholesale price is required", valueAsNumber: true })}
            type="number"
            defaultValue={sampleData.WholeSalePrice} // Sample data
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.WholeSalePrice && <span className="text-red-500">{errors.WholeSalePrice.message}</span>}
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            {...register("category", { required: "Category is required" })}
            defaultValue={sampleData.category} // Sample data
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="Regular">Regular</option>
            <option value="Premium">Premium</option>
            <option value="SSspecial">SSspecial</option>
          </select>
          {errors.category && <span className="text-red-500">{errors.category.message}</span>}
        </div>

        {/* In Stock Status */}
        <div>
          <label htmlFor="inStockStatus" className="block text-sm font-medium text-gray-700">
            In Stock Status
          </label>
          <select
            id="inStockStatus"
            {...register("inStockStatus", { required: "In Stock Status is required" })}
            defaultValue={sampleData.inStockStatus} // Sample data
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="In Stock">In Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
          {errors.inStockStatus && <span className="text-red-500">{errors.inStockStatus.message}</span>}
        </div>

        {/* Delivery Date */}
        <div>
          <label htmlFor="dateToDeliver" className="block text-sm font-medium text-gray-700">
            Delivery Date
          </label>
          <input
            id="dateToDeliver"
            {...register("dateToDeliver", { required: "Delivery Date is required" })}
            type="date"
            defaultValue={sampleData.dateToDeliver} // Sample data
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.dateToDeliver && <span className="text-red-500">{errors.dateToDeliver.message}</span>}
        </div>

        {/* Tags */}
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
            Tags (Optional)
          </label>
          <input
            id="tags"
            {...register("tags")}
            type="text"
            placeholder="Enter tags separated by commas"
            defaultValue={sampleData.tags} // Sample data
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

      {/* Color */}
      <div>
        <label htmlFor="color" className="block text-sm font-medium text-gray-700">
          Color (Optional)
        </label>
        <input
          id="color"
          {...register("color")}
          type="text"
          defaultValue={sampleData.color} // Sample data
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* Sizes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Sizes</label>
        <div className="flex flex-wrap gap-4">
          {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
            <label key={size} className="inline-flex items-center">
              <input
                type="checkbox"
                value={size}
                checked={selectedSizes.includes(size)}
                onChange={(e) => {
                  const { value, checked } = e.target;
                  if (checked) {
                    setSelectedSizes((prev) => [...prev, value]);
                  } else {
                    setSelectedSizes((prev) => prev.filter((s) => s !== value));
                  }
                }}
                className="form-checkbox h-4 w-4 text-indigo-600"
              />
              <span className="ml-2">{size}</span>
            </label>
          ))}
        </div>
        <div className="mt-2">
          <label htmlFor="customSize" className="block text-sm font-medium text-gray-700">
            Custom Size
          </label>
          <input
            id="customSize"
            type="text"
            {...register("customSize")}
            onChange={(e) => {
              setValue("customSize", e.target.value);
            }}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter custom size"
          />
        </div>
      </div>

        {/* Images */}
        <div>
          <label htmlFor="images" className="block text-sm font-medium text-gray-700">
            Product Images
          </label>
          <input
            id="images"
            {...register("images")}
            type="file"
            multiple
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm"
          />
        </div>

        <button
          type="submit"
          className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-md"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
