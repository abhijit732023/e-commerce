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
import { motion, AnimatePresence } from "framer-motion";


const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  hover: {
    scale: 1.045,
    boxShadow: "0 8px 32px 0 rgba(255, 72, 66, 0.13)",
    transition: { type: "spring", stiffness: 260, damping: 18 },
  },
  exit: {
    opacity: 0,
    y: 40,
    scale: 0.97,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [likedProducts, setLikedProducts] = useState({});
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
  const toggleLike = (productId) => {
    setLikedProducts((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };
  
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
      <motion.div
        className="flex pb:10 flex-col h-full w-full px-2 sm:px-4 md:px-6 py-4 md:py-6 bg-gradient-to-br from-amber-50 via-white to-rose-50 shadow-xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.5 }}

      >
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          viewport={{ once: true, amount: 0.5 }}

        >
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-rose-700 drop-shadow mb-1">
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
      className={`whitespace-nowrap px-4 py-1.5 rounded-full font-semibold border text-xs md:text-base transition-all duration-200 shadow-sm
        ${selectedCategory === value
          ? "bg-rose-600 text-white border-rose-600 shadow-lg"
          : "bg-white text-rose-700 border-rose-200 hover:bg-rose-50 hover:border-rose-400"
        }`}
    >
      {value}
    </button>
  ))}
</div>

        </motion.div>

        {/* Product Grid */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid  grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            <AnimatePresence>
              {filteredProducts.length === 0 && (
                <motion.div
                  className="col-span-full text-center text-gray-400 text-base md:text-lg font-semibold py-12"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  viewport={{ once: true, amount: 0.5 }}

                >
                  No products found in this category.
                </motion.div>
              )}

              {filteredProducts.map((product) => {
                const discount =
                  product.fakePrie && product.fakePrie > 0
                    ? Math.round(((product.fakePrie - product.price) / product.fakePrie) * 100)
                    : 0;
                const isLiked = likedProducts[product._id];

                return (
                  <motion.div
                    key={product._id}
                    className="w-full   bg-white border border-rose-100 rounded-2xl shadow-lg transition-all duration-300 relative group hover:shadow-2xl hover:-translate-y-1"
                    variants={cardVariants}
                    viewport={{ once: true, amount: 0.5 }}

                  >
                    <Link to={`${product._id}`} className="block h-full w-full">
                      <div className="relative w-full p-2">
                        {/* Image Viewer */}
                        <div className="aspect-[3/4] w-full overflow-hidden rounded-xl">
                          <SwipeImageViewer images={product.images} name={product.name} />
                        </div>

                        {/* Heart Button */}
                        {/* <motion.button
                          whileTap={{ scale: 0.8, rotate: -15 }}
                          onClick={(e) => {
                            e.preventDefault();
                            toggleLike(product._id);
                          }}
                          className="absolute top-1.5 right-1.5 md:top-2 md:right-2 text-base md:text-xl bg-white/90 rounded-full p-2 shadow-md hover:bg-rose-100 transition"
                          aria-label="Like"
                        >
                          <FaHeart
                            className={`transition-colors duration-200 ${isLiked ? "text-rose-600" : "text-gray-300"}`}
                          />
                        </motion.button> */}
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
                        <span className="absolute top-2 left-2 bg-rose-600 text-white text-xs font-bold px-2 py-1 rounded shadow">
                          SS Special
                        </span>
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </Container>
  );
};

export default ProductPage;
