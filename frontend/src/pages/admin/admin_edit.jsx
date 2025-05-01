import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ENV_File } from "../../FilesPaths/all_path.js";
import { Client, Storage, ID } from "appwrite";

// Appwrite setup
const client = new Client()
    .setEndpoint(ENV_File.appwriteUrl)
    .setProject(ENV_File.appwriteProjectId);
const storage = new Storage(client);

export default function AdminEditForm() {
    const { productId } = useParams();
    const isEditMode = Boolean(productId);

    const { register, handleSubmit, reset, watch, setValue } = useForm();
    const [loading, setLoading] = useState(false);
    const [initialImages, setInitialImages] = useState([]);

    useEffect(() => {
        if (isEditMode) {
            axios
                .get(`${ENV_File.backendURL}/admin/product/${productId}`)
                .then((res) => {
                    const data = res.data;
                    reset({
                        ...data,
                        tags: data.tags.join(", "),
                        dateToDeliver: new Date(data.dateToDeliver).toISOString().split("T")[0],
                        inStock: data.inStock ? "true" : "false",
                        isFeatured: data.isFeatured ? "true" : "false",
                    });
                    setInitialImages(data.images);
                })
                .catch((err) => {
                    console.error("Failed to fetch product:", err);
                    alert("Failed to load product data.");
                });
        }
    }, [productId, isEditMode, reset]);

    const uploadImagesToAppwrite = async (files) => {
        const urls = [];
        for (const file of files) {
            const res = await storage.createFile(ENV_File.appwriteBucketId, ID.unique(), file);
            urls.push(res.$id);
        }
        return urls;
    };

    const onSubmit = async (data) => {
        setLoading(true);
        try {
          let imageUrls = initialImages;
      
          // ✅ If new images are provided, upload and override
          if (data.images && data.images.length > 0 && data.images[0] instanceof File) {
            imageUrls = await uploadImagesToAppwrite(data.images);
          }
      
          const product = {
            ...data,
            originalPrice: parseFloat(data.originalPrice),
            discountedPrice: parseFloat(data.discountedPrice),
            quantity: parseInt(data.quantity),
            availableSizes: data.availableSizes,
            tags: data.tags.split(",").map((tag) => tag.trim()),
            inStock: data.inStock === "true",
            isFeatured: data.isFeatured === "true",
            dateToDeliver: new Date(data.dateToDeliver),
            images: imageUrls, // ✅ Will remain unchanged if no new images are uploaded
          };
      
          const url = isEditMode
            ? `${ENV_File.backendURL}/admin/update/${productId}`
            : `${ENV_File.backendURL}/admin/create`;
      
          const method = isEditMode ? "put" : "post";
      
          await axios[method](url, product, {
            headers: {
              "Content-Type": "application/json",
            },
          });
      
          alert(`✅ Product ${isEditMode ? "updated" : "created"} successfully!`);
          if (!isEditMode) reset();
        } catch (error) {
          console.error("❌ Submit error:", error);
          alert(`Failed to ${isEditMode ? "update" : "create"} product.`);
        } finally {
          setLoading(false);
        }
      };
      

    const availableSizes = ["XS", "S", "M", "L", "XL", "XXL", "custom-size"];
    const selectedSizes = watch("availableSizes") || [];

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg"
        >
            <h2 className="text-2xl font-bold mb-4 text-center">
                {isEditMode ? "Edit Product" : "Add New Product"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input {...register("header")} placeholder="Product Title" className="input" required />
                <input {...register("brand")} placeholder="Brand" className="input" />
                <input {...register("originalPrice")} type="number" step="0.01" placeholder="Original Price (MRP)" className="input" required />
                <input {...register("discountedPrice")} type="number" step="0.01" placeholder="Discounted Price" className="input" required />
                <input {...register("category")} placeholder="Category" className="input" required />
                <input {...register("color")} placeholder="Color" className="input" />
                <input {...register("quantity")} type="number" placeholder="Quantity" className="input" required />
                <input {...register("tags")} placeholder="Tags (comma-separated)" className="input" />
                <select {...register("inStock")} className="input">
                    <option value="true">In Stock</option>
                    <option value="false">Out of Stock</option>
                </select>
                <select {...register("isFeatured")} className="input">
                    <option value="false">Not Featured</option>
                    <option value="true">Featured</option>
                </select>
            </div>

            <textarea
                {...register("description")}
                placeholder="Product Description"
                rows={4}
                className="input"
                required
            />

            <div className="space-y-2">
                <h3 className="font-semibold">Available Sizes</h3>
                <div className="flex gap-4 flex-wrap">
                    {availableSizes.map((size) => (
                        <label key={size} className="flex items-center gap-2">
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
                <h3 className="font-semibold">Upload Images</h3>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    {...register("images")}
                    className="input"
                />
            </div>
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
            >
                {loading ? (isEditMode ? "Updating..." : "Uploading...") : isEditMode ? "Update Product" : "Create Product"}
            </button>
        </form>
    );
}
