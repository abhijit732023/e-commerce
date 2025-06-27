import React, { useEffect, useState } from "react";
import {
  SwipeImageViewer,
  ENV_File,
  Container,
} from "../../FilesPaths/all_path";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${ENV_File.backendURL}/admin/product/detail`);
        const reversed = [...response.data].reverse();
        setProducts(reversed);
        setFilteredProducts(reversed);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const categoryOptions = ["All", ...new Set(products.map(p => p.category).filter(Boolean))];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((product) => product.category === category));
    }
  };

  return (
    <Container>
      <div className="flex flex-col min-h-screen w-full px-2 sm:px-4 md:px-6 py-4 md:py-6 bg-gradient-to-br from-amber-50 via-white to-rose-50">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-rose-700 mb-1">
              Shop Bridal Collection
            </h2>
            <p className="text-gray-500 text-sm md:text-base font-medium">
              Discover our curated selection of beautiful bridal wear.
            </p>
          </div>

          <div className="flex gap-2 md:gap-3 mt-2 md:mt-0 overflow-x-auto scrollbar-hide">
            {categoryOptions.map((value) => (
              <button
                key={value}
                onClick={() => handleCategoryChange(value)}
                className={`whitespace-nowrap px-4 py-1.5 mb-4 rounded-full font-semibold border text-xs md:text-base
                  ${selectedCategory === value
                    ? "bg-rose-600 text-white border-rose-600"
                    : "bg-white text-rose-700 border-rose-200 hover:bg-rose-50 hover:border-rose-400"
                  }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-2 gap-y-6 md:gap-6">
            {filteredProducts.length === 0 ? (
              [...Array(8)].map((_, idx) => (
                <div
                  key={idx}
                  className="bg-white/70 rounded-2xl border border-rose-100 p-4 flex flex-col"
                >
                  <div className="h-40 bg-gray-200/50 rounded-xl mb-4"></div>
                  <div className="h-5 bg-gray-200/50 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200/50 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200/50 rounded w-1/3"></div>
                </div>
              ))
            ) : (
              filteredProducts.map((product) => {
                const discount =
                  product.fakePrie && product.fakePrie > 0
                    ? Math.round(((product.fakePrie - product.price) / product.fakePrie) * 100)
                    : 0;

                return (
                  <div
                    key={product._id}
                    className="w-full bg-white border border-rose-100 rounded-lg"
                  >
                    <Link to={`${product._id}`} className="block h-full w-full">
                      <div className="relative w-full p-2">
                        {/* Image Viewer */}
                        <div className="aspect-[3/4] w-full overflow-hidden rounded-lg">
                          <SwipeImageViewer images={product.images} name={product.name} loading="lazy" />
                        </div>
                      </div>

                      <div className="px-3 py-2 md:p-4 w-full">
                        <h4 className="font-semibold text-sm sm:text-base md:text-lg text-gray-800 truncate mb-1">
                          {product.header}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-500 truncate mb-2">{product.description}</p>

                        <div className="flex items-center space-x-2 mt-2 w-full">
                          <span className="font-bold text-base md:text-lg text-rose-700">
                            ₹{product.price}
                          </span>
                          {product.fakePrie && (
                            <span className="line-through text-gray-400 text-xs md:text-sm">
                              ₹{product.fakePrie}
                            </span>
                          )}
                          {discount > 0 && (
                            <span className="text-green-600 text-xs font-semibold px-1 py-0.5">
                              {discount}% OFF
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Badge */}
                      {product.category === "SSspecial" && (
                        <span className="absolute top-2 left-2 bg-rose-600 text-white text-xs font-bold px-2 py-1 rounded">
                          SS Special
                        </span>
                      )}
                    </Link>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProductPage;