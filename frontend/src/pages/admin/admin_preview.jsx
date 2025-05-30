import React, { useEffect, useState } from "react";
import axios from "axios";
import { ENV_File, Product_2 } from "../../FilesPaths/all_path";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${ENV_File.backendURL}/add`);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Delete this product?")) {
      try {
        await axios.delete(`${ENV_File.backendURL}/add/delete/${id}`);
        fetchProducts();
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {editing ? "Edit Product" : "Add Product"}
      </h2>

      {/* Uncomment below to include Product Form */}
      {/* <Product_2 product={editing} onSuccess={() => {
        setEditing(null);
        fetchProducts();
      }} /> */}

      <h2 className="text-2xl font-semibold text-gray-800 my-6 border-b pb-2">
        All Products ({products.length})
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white flex gap-2  rounded-xl shadow hover:shadow-lg transition-shadow p-4 "
          >
            <div className="h-40 overflow-hidden rounded-md mb-3">
              {p.images?.[0] ? (
                <img
                  src={p.images[0]}
                  alt={p.header}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-700 truncate">
                {p.header}
              </h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-3">
                {p.description}
              </p>

              <div className="mt-2 flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">
                  ₹{p.price}
                </span>
                <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded line-through">
                  ₹{p.fakePrice || p.fakePrie}
                </span>
                <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded">
                  {p.category || "Uncategorized"}
                </span>
              </div>

            <div className="mt-4 flex justify-end gap-4 items-center">
              <button
                onClick={() => setEditing(p)}
                className="text-sm text-white bg-indigo-600 px-3 py-1 rounded hover:bg-indigo-700"
              >
                Edit
              </button>
              <button
                onClick={() => deleteProduct(p._id)}
                className="text-sm text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
