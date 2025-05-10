import React, { useEffect, useState } from "react";
import {
  useAuth,
  SwipeImageViewer,
  AppwriteService,
  ENV_File,
  Container,
} from "../../FilesPaths/all_path";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [likedProducts, setLikedProducts] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${ENV_File.backendURL}/admin/product/detail`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const toggleLike = (productId) => {
    setLikedProducts((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  return (
    <Container>
      <div className="p-4 md:p-6 pb-24 bg-white/80 min-h-screen">
        <h2 className="text-xl  md:text-3xl font-bold mb-6 tracking-wide text-gray-800">
          💍 Shop Bridal Collection
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {products.map((product) => {
            const discount = Math.round(((product.fakePrie - product.price) / product.fakePrie) * 100);
            const isLiked = likedProducts[product._id];

            return (
              <div
                key={product._id}
                className="bg-white border border-gray-400 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative"
              >
                <Link to={`${product._id}`} className="block h-full">
                  <div className="relative p-1">
                    <SwipeImageViewer images={product.images} name={product.name} />

                    {/* Heart Icon */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleLike(product._id);
                      }}
                      className="absolute top-2 right-2 text-xl bg-white rounded-full p-1 shadow-sm"
                    >
                      <FaHeart
                        className={`transition-colors duration-200 ${
                          isLiked ? "text-red-500" : "text-gray-300"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="p-3">
                    <h4 className="font-semibold text-sm md:text-base text-gray-800 truncate">
                      {product.header}
                    </h4>
                    <p className="text-xs text-gray-500 truncate mt-1">
                      {product.description}
                    </p>

                    <div className="flex items-center space-x-1 mt-2">
                      <span className="font-bold text-sm md:text-base text-gray-800">
                        ₹{product.price}
                      </span>
                      <span className="line-through text-gray-400 text-xs">₹{product.fakePrie}</span>
                      <span className="text-green-600 text-xs font-medium">{discount}% OFF</span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default ProductPage;
