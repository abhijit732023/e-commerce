import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaStar, FaHeart, FaShoppingCart, FaTrash } from "react-icons/fa";
import { AppwriteService, Container, ENV_File, useCartWishlist } from "../../FilesPaths/all_path";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const WishlistPage = () => {
  const { userid } = useParams();
  const [ratings, setRatings] = useState({});
  const [loadingCart, setLoadingCart] = useState(null);
  const [removing, setRemoving] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [popup, setPopup] = useState({ show: false, message: "", type: "" });
  const { fetchCounts } = useCartWishlist();

  // Fetch wishlist data
  const fetchWishlist = async () => {
    try {
      const response = await axios.get(`${ENV_File.backendURL}/wishlist`);
      setWishlist(response.data);
    } catch (error) {
      setPopup({ show: true, message: "Failed to fetch wishlist.", type: "error" });
      console.error("Error fetching wishlist:", error);
    }
  };

  useEffect(() => {
    fetchWishlist();
    // eslint-disable-next-line
  }, []);

  // Re-fetch wishlist when fetchCounts changes (after add/remove)
  useEffect(() => {
    fetchWishlist();
    // eslint-disable-next-line
  }, [fetchCounts]);

  const Filtered = wishlist?.filter((item) => item.userId === userid);

  const handleAddToCart = async (item) => {
    setLoadingCart(item._id);
    const { _id, _v, createdAt, updateAt, ...orderitem } = item;
    try {
      await axios.post(`${ENV_File.backendURL}/order/add`, orderitem);
      await axios.delete(`${ENV_File.backendURL}/wishlist/${item._id}`);

      setPopup({ show: true, message: "Added to cart successfully!", type: "success" });
      fetchCounts(); // trigger re-render
    } catch (error) {
      setPopup({ show: true, message: "Failed to add to cart.", type: "error" });
      console.error("Error adding to cart:", error);
    }
    setLoadingCart(null);
    setTimeout(() => setPopup({ show: false, message: "", type: "" }), 2000);
  };

  const handleRemoveFromWishlist = async (item) => {
    setRemoving(item._id);
    try {
      await axios.delete(`${ENV_File.backendURL}/wishlist/${item._id}`);
      setPopup({ show: true, message: "Removed from wishlist!", type: "success" });
      fetchCounts(); // trigger re-render
    } catch (error) {
      setPopup({ show: true, message: "Failed to remove from wishlist.", type: "error" });
      console.error("Error removing from wishlist:", error);
    }
    setRemoving(null);
    setTimeout(() => setPopup({ show: false, message: "", type: "" }), 2000);
  };

  const handleRating = (productId, rating) => {
    setRatings((prev) => ({
      ...prev,
      [productId]: rating,
    }));
  };

  return (
    <Container>
      {/* Popup Notification */}
      {popup.show && (
        <div
          className={`absolute top-6 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-xl pb-15 shadow-lg text-white font-semibold transition-all duration-300
            ${popup.type === "success" ? "bg-green-600" : "bg-rose-600"}`}
        >
          {popup.message}
        </div>
      )}
      <div className="bg-gradient-to-br from-amber-50 via-white to-rose-50 min-h-[84vh] px-4 py-6 text-sm rounded-2xl shadow-xl">
        <div className="flex items-center gap-3 pb-4">
          <FaHeart className="text-2xl text-rose-600 drop-shadow" />
          <h2 className="font-semibold text-2xl text-rose-700">Your Wishlist</h2>
        </div>

        <div className="bg-yellow-100 text-yellow-800 text-sm p-3 rounded mb-6 shadow flex items-center gap-2">
          <FaStar className="text-yellow-400" />
          <span>
            Hey! This is your saved Wishlist. Add your favorites to cart anytime.
          </span>
        </div>

        {Filtered && Filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {Filtered.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
                className="bg-white rounded-2xl shadow-lg p-4 flex flex-col border border-rose-100 hover:shadow-2xl transition-all duration-300 relative group"
              >
                <div className="absolute top-3 right-3">
                  <FaHeart className="text-rose-500 drop-shadow overflow-hidden" />
                </div>
                <div className="text-xs text-gray-400 mb-2">Wish ID: {item.productId}</div>
                <div className="flex items-start gap-4">
                  <Link to={`/product/${item.productId}`} className="w-[25vw]">
                  <img
                    src={ENV_File.backendURL+item.images[0]}
                    alt={item.header}
                    className=" h-auto object-cover rounded-lg border border-rose-100 shadow"
                  />
                  </Link>
                  <div className="flex-1">
                    <div className="font-semibold text-lg text-gray-800 mb-1 truncate">
                      {item.header}
                    </div>
                    <div className="text-gray-700 text-xs mb-2 line-clamp-3">
                      {item.description}
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs mb-2">
                      <span className="bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full font-semibold">
                        Size: {item.size}
                      </span>
                      <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">
                        ₹{item.price}
                      </span>
                    </div>
                    <div className="text-gray-500 text-xs">
                      Payment: <span className="font-semibold">{item.paymentStatus || "N/A"}</span>
                    </div>
                  </div>
                </div>

                {/* Clickable Stars for Rating */}
                <div className="flex items-center gap-1 mt-4 text-yellow-400 text-sm">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar
                      key={i}
                      onClick={() => handleRating(item.productId, i + 1)}
                      className={
                        i < (ratings[item.productId] || 0)
                          ? "text-yellow-400 cursor-pointer"
                          : "text-gray-300 cursor-pointer"
                      }
                    />
                  ))}
                  <span className="ml-2 text-gray-500 text-xs">Rate this item</span>
                </div>

                {/* Add to Cart and Remove Buttons */}
                <div className="flex gap-2 mt-5">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    disabled={loadingCart === item._id}
                    onClick={() => handleAddToCart(item)}
                    className={`flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white text-sm px-3 py-2 rounded-lg shadow hover:bg-blue-600 transition-all duration-200 font-semibold ${loadingCart === item._id ? "opacity-60 cursor-not-allowed" : ""
                      }`}
                  >
                    <FaShoppingCart />
                    {loadingCart === item._id ? "Adding..." : "Add to Cart"}
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    disabled={removing === item._id}
                    onClick={() => handleRemoveFromWishlist(item)}
                    className={`flex-1 flex items-center justify-center gap-2 bg-rose-500 text-white text-sm px-3 py-2 rounded-lg shadow hover:bg-rose-600 transition-all duration-200 font-semibold ${removing === item._id ? "opacity-60 cursor-not-allowed" : ""
                      }`}
                  >
                    <FaTrash />
                    {removing === item._id ? "Removing..." : "Remove"}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="text-center text-gray-500 text-lg mt-16 flex flex-col items-center"
            >
              <FaHeart className="text-5xl text-rose-200 mb-4 animate-bounce" />
              <div>No products added to wishlist.</div>
              <Link
                to="/product"
                className="mt-6 inline-block bg-rose-600 text-white px-6 py-2 rounded-full shadow hover:bg-rose-700 transition-all duration-200 font-semibold"
              >
                Start Shopping
              </Link>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </Container>
  );
};

export default WishlistPage;