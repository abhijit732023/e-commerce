import axios from "axios";
import React, { useState } from "react";
import useSWR from "swr";
import { FaStar } from "react-icons/fa";
import { AppwriteService, Container, ENV_File } from "../../FilesPaths/all_path";
import { Link } from "react-router-dom";

const fetcher = url => axios.get(url).then(res => res.data);

const WishlistPage = () => {
  const [productid, setProductid] = useState('');



  const { data: wishlist, error, mutate } = useSWR(`${ENV_File.backendURL}/wishlist`, fetcher, {
    refreshInterval: 5000, // Poll every 5 seconds
    revalidateOnFocus: true, // Refetch on window focus
  });
  console.log("Wishlist data:", wishlist);



  const [ratings, setRatings] = useState({}); // State to track ratings for each item

  if (error) {
    console.error("Error fetching wishlist:", error);
  }

  const handleAddToCart = async (item) => {
    const { _id, _v, createdAt, updateAt, ...orderitem } = item
    try {
      const respose = await axios.post(`${ENV_File.backendURL}/order/add`, orderitem);
      console.log("Added to cart:", respose.data);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleRemoveFromWishlist = async (item) => {
    try {
      await axios.delete(`${ENV_File.backendURL}/wishlist/${item._id}`);
      console.log("Removed from wishlist:", item.productId);
      mutate(); // Refresh the wishlist data
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  const handleRating = (productId, rating) => {
    setRatings((prev) => ({
      ...prev,
      [productId]: rating, // Update the rating for the specific product
    }));
  };

  return (
    <Container>
{/* <Link
  to={-1}
  className="flex items-center gap-2 px-4 py-2  bg-gray-400/20 text-gray-700 rounded-md  transition-all duration-200"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 19.5L8.25 12l7.5-7.5"
    />
  </svg>
  Back
</Link> */}
      <div className="bg-gray-100 min-h-screen px-4 py-6 text-sm">
        <h2 className="font-semibold text-2xl py-4">Wishlist</h2>

        <div className="bg-yellow-100 text-yellow-800 text-sm p-3 rounded mb-6">
          ⚠️ Hey! Please note that this is your saved Wishlist.
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(wishlist || []).map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-4 flex flex-col">
              <div className="text-xs text-gray-400 mb-2">Wish ID: {item.productId}</div>

              <div className="flex items-start gap-4">
                <img
                  src={AppwriteService.getFileViewUrl(item.images[0])}
                  alt={item.header}
                  className="w-32 h-42 object-cover rounded"
                />

                <div className="flex-1">
                  <div className="font-semibold text-lg text-gray-800 mb-2">
                    {item.header}
                  </div>

                  <div className="text-gray-700 text-sm mb-2">
                    {item.description}
                  </div>

                  <div className="text-gray-500 text-sm">
                    Quantity: {item.quantity}
                  </div>

                  <div className="text-gray-500 text-sm">
                    Size: {item.size}
                  </div>

                  <div className="text-gray-500 text-sm">
                    Price: ${item.price}
                  </div>

                  <div className="text-gray-500 text-sm">
                    Payment Status: {item.paymentStatus}
                  </div>
                </div>
              </div>

              {/* Clickable Stars for Rating */}
              <div className="flex items-center gap-1 mt-4 text-yellow-400 text-sm">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    onClick={() => handleRating(item.productId, i + 1)} // Set rating on click
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
              <div className="flex gap-0.5 mt-4 ">
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-blue-500 text-white text-sm px-2 py-1.5 rounded hover:bg-blue-600 flex-1"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleRemoveFromWishlist(item)}
                  className="bg-red-500 text-white text-sm px-2 py-1.5 rounded hover:bg-red-600 flex-1"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default WishlistPage;