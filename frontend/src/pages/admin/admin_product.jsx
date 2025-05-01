import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { ENV_File } from "../../FilesPaths/all_path.js";
import { Client, Storage, ID } from "appwrite";

// Appwrite setup
const client = new Client()
  .setEndpoint(ENV_File.appwriteUrl)
  .setProject(ENV_File.appwriteProjectId);
const storage = new Storage(client);

export default function AdminProductForm() {
  const { register, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: {
      header: "Sample Product",
      brand: "Sample Brand",
      originalPrice: 100.0,
      discountedPrice: 80.0,
      category: "Sample Category",
      color: "Red",
      quantity: 10,
      availableSizes: ["S", "M", "L"],  // Default selected sizes
      tags: "tag1,tag2",
      dateToDeliver: new Date().toISOString().split("T")[0],
      inStock: "true",
      isFeatured: "false",
      description: "Sample product description.",
    }
  });

  const [loading, setLoading] = useState(false);

  const uploadImagesToAppwrite = async (files) => {
    const urls = [];
    console.log(files);
    
    for (const file of files) {
      const res = await storage.createFile(ENV_File.appwriteBucketId, ID.unique(), file);
      console.log(res);
      
      urls.push(`${res.$id}`);
    }
    return urls;
  };

  const onSubmit = async (data) => {
    console.log(data);
    
    setLoading(true);
    try {
      const imageFiles = data.images;
      const imageUrls = imageFiles ? await uploadImagesToAppwrite(imageFiles) : [];

      const product = {
        header: data.header,
        description: data.description,
        category: data.category,
        brand: data.brand,
        originalPrice: parseFloat(data.originalPrice),
        discountedPrice: parseFloat(data.discountedPrice),
        availableSizes: data.availableSizes,  // Use the array of selected sizes
        quantity: parseInt(data.quantity),
        color: data.color,
        tags: data.tags.split(",").map((tag) => tag.trim()),
        dateToDeliver: new Date(data.dateToDeliver),
        inStock: data.inStock === "true",
        isFeatured: data.isFeatured === "true",
        images: imageUrls.length > 0 ? imageUrls : undefined,
      };

      await axios.post(`${ENV_File.backendURL}/admin/create`, product, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      alert("✅ Product created successfully!");
      reset();
    } catch (error) {
      console.error("❌ Upload error:", error);
      alert("Failed to create product.");
    } finally {
      setLoading(false);
    }
  };

  // Watch sizes selected
  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL", "custom-size"];
  const selectedSizes = watch("availableSizes");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-blue-900/40 p-8 rounded-xl text-black shadow-lg max-w-3xl mx-auto space-y-6"
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-white">Add New Product</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input {...register("header")} placeholder="Product Title" className="input-style" required />
        <input {...register("brand")} placeholder="Brand" className="input-style" />
        <input {...register("originalPrice")} type="number" step="0.01" placeholder="Original Price (MRP)" className="input-style" required />
        <input {...register("discountedPrice")} type="number" step="0.01" placeholder="Discounted Price" className="input-style" required />
        <input {...register("category")} placeholder="Category" className="input-style" required />
        <input {...register("color")} placeholder="Color" className="input-style" />
        <input {...register("quantity")} type="number" placeholder="Quantity" className="input-style" required />
        <input {...register("tags")} placeholder="Tags (comma-separated)" className="input-style" />
        <select {...register("inStock")} className="input-style">
          <option value="true">In Stock</option>
          <option value="false">Out of Stock</option>
        </select>
        <select {...register("isFeatured")} className="input-style">
          <option value="false">Not Featured</option>
          <option value="true">Featured</option>
        </select>
      </div>

      <textarea
        {...register("description")}
        placeholder="Product Description"
        rows={4}
        className="input-style"
        required
      />

      <div className="space-y-2">
        <h3 className="font-semibold ">Available Sizes</h3>
        <div className="flex gap-4 flex-wrap">
          {availableSizes.map((size) => (
            <label key={size} className="flex items-center gap-2 ">
              <input
                type="checkbox"
                value={size}
                {...register("availableSizes")}
                checked={selectedSizes.includes(size)}
                className="w-5 h-5"
              />
              {size}
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold ">Upload Images</h3>
        <input
          type="file"
          accept="image/*"
          multiple
          {...register("images")}
          className="input-style"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#00ffcc] hover:bg-[#00e5b7] text-black py-2 rounded transition"
      >
        {loading ? "Uploading..." : "Create Product"}
      </button>
    </form>
  );
}
