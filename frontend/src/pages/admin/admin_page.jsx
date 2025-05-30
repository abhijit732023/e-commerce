import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ENV_File } from "../../FilesPaths/all_path";

const ProductForm = ({ product }) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      header: 'best',
      description: 'asdfg',
      price: 120,
      fakePrie: 150,
      wholeSaleQuantity: 60,
      WholeSalePrice: 100,
      category: 'Regular', // default here
      dateToDeliver: '',
      size: ["S","M"],
      tags: 'sample,example,product',
      color: 'Red',
    },
  });

  useEffect(() => {
    if (product) {
      Object.entries(product).forEach(([key, value]) => {
        setValue(key, value);
      });
    }
  }, [product, setValue]);

  const onSubmit = async (data) => {
    const formData = new FormData();

    for (let key in data) {
      if (key === "tags") {
        formData.append(key, data[key].split(",").map(tag => tag.trim()));
      } else if (key === "size") {
        data[key].forEach(sz => formData.append("size", sz));
      } else {
        formData.append(key, data[key]);
      }
    }

    if (data.images && data.images.length > 0) {
      for (let i = 0; i < data.images.length; i++) {
        formData.append("images", data.images[i]);
      }
    }

    try {
      if (product?._id) {
        await axios.put(`${ENV_File}/add/update/${product._id}`, formData);
      } else {
        await axios.post(`${ENV_File.backendURL}/add/add`, formData);
      }
      // onSuccess();
      reset();
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  return (
    <div className="h-[100vh] overflow-y-auto p-4 bg-white rounded shadow">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("header")} placeholder="Header" className="w-full p-2 border rounded" />
        <textarea {...register("description")} placeholder="Description" className="w-full p-2 border rounded" />
        <input {...register("price")} type="number" placeholder="Price" className="w-full p-2 border rounded" />
        <input {...register("fakePrie")} type="number" placeholder="Fake Price" className="w-full p-2 border rounded" />
        <input {...register("wholeSaleQuantity")} type="number" placeholder="Wholesale Quantity" className="w-full p-2 border rounded" />
        <input {...register("WholeSalePrice")} type="number" placeholder="Wholesale Price" className="w-full p-2 border rounded" />
        
        {/* Category as input */}
        <input {...register("category")} placeholder="Category (e.g. Regular)" className="w-full p-2 border rounded" />

        <input {...register("dateToDeliver")} type="date" className="w-full p-2 border rounded" />

        <div>
          <label className="block font-medium">Sizes</label>
          <div className="flex flex-wrap gap-2">
            {["XS", "S", "M", "L", "XL", "XXL", "XXXL", "CUSTOM-SIZE"].map(sz => (
              <label key={sz} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  value={sz}
                  {...register("size")}
                /> {sz}
              </label>
            ))}
          </div>
        </div>

        <input {...register("tags")} placeholder="Tags (comma-separated)" className="w-full p-2 border rounded" />
        <input {...register("color")} placeholder="Color" className="w-full p-2 border rounded" />
        <input {...register("images")} type="file" multiple className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          {product ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
