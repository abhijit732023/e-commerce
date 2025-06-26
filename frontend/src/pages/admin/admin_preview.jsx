import React, { useEffect, useState } from "react";
import axios from "axios";
import { ENV_File, Container } from "../../FilesPaths/all_path";
import { Link } from "react-router-dom";

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
    <Container>
      <div className="p-6 min-h-screen bg-gradient-to-br from-amber-50 via-white to-rose-50 overflow-y-auto max-h-screen shadow-lg">
        <h2 className="text-2xl font-semibold text-rose-700 my-6 border-b border-rose-300 pb-2">
          All Products ({products.length})
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-2 gap-8 pb-20">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white w-full max-w-2xl h-60 flex flex-row rounded-2xl shadow-lg hover:shadow-2xl transition-shadow p-4 mx-auto"
            >
              {/* Image on the left */}
              <div className="h-full w-40 min-w-40 max-w-40 overflow-hidden rounded-lg flex items-center justify-center bg-gray-100 mr-6">
                {p.images?.[0] ? (
                  <img
                    src={ENV_File.backendURL + p.images[0]}
                    alt={p.header}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
              </div>

              {/* Content on the right */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-rose-700 truncate">{p.header}</h3>
                  <p className="text-sm text-rose-600 mt-2 line-clamp-2 h-10">
                    {p.description}
                  </p>
                </div>

                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="bg-rose-100 text-rose-700 text-xs px-3 py-1 rounded-full font-semibold">
                    ₹{p.price}
                  </span>
                  <span className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full line-through font-semibold">
                    ₹{p.fakePrice || p.fakePrie}
                  </span>
                  <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-semibold">
                    {p.category || "Uncategorized"}
                  </span>
                </div>

                <div className="mt-4 flex justify-end gap-3 items-center">
                  <button
                    onClick={() => deleteProduct(p._id)}
                    className="text-sm text-white bg-red-500 px-4 py-2 rounded-xl hover:bg-red-600 shadow-md transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default ProductList;