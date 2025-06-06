import React, { useEffect, useState } from "react";
import axios from "axios";
import { ENV_File, Product_2, Container } from "../../FilesPaths/all_path";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${ENV_File.backendURL}/add`);
      console.log('resdata',res.data);
      
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
      <div className="p-6 min-h-screen bg-gradient-to-br from-amber-50 via-white to-rose-50 overflow-y-auto max-h-screen rounded-3xl shadow-lg">
        <h2 className="text-3xl font-extrabold text-rose-700 mb-8 drop-shadow-md">
          {editing ? "Edit Product" : "Add Product"}
        </h2>

        {/* Uncomment below to include Product Form */}
        {/* <Product_2 product={editing} onSuccess={() => {
          setEditing(null);
          fetchProducts();
        }} /> */}

        <h2 className="text-2xl font-semibold text-rose-700 my-6 border-b border-rose-300 pb-2">
          All Products ({products.length})
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8  pb-20" >
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white flex  gap-3 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow p-6"
            >
              <div className="h-44 overflow-hidden rounded-lg mb-4">
                {p.images?.[0] ? (
                  <img
                    src={ENV_File.backendURL+p.images[0]}
                    alt={p.header}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <h3 className="text-xl font-bold text-rose-700 truncate">
                  {p.header}
                </h3>
                <p className="text-sm text-rose-600 mt-2 line-clamp-3">
                  {p.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-3">
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

                <div className="mt-6 flex justify-end gap-5 items-center">
                  <button
                    onClick={() => setEditing(p)}
                    className="text-sm text-white bg-rose-600 px-4 py-2 rounded-xl hover:bg-rose-700 shadow-md transition"
                  >
                    Edit
                  </button>
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
