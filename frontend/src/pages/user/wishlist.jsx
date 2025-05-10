import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { AppwriteService, Container, ENV_File } from "../../FilesPaths/all_path";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await axios.get(`${ENV_File.backendURL}/wishlist`);
        console.log(res.data);

        if (res.data) {
          setWishlist(res.data);
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };
    fetchWishlist();
  }, []);

  return (
    <Container>
      <div className="bg-gray-100 min-h-screen px-4 py-2 text-sm">
      <h2 className="font-semibold text-lg py-2">Wishlist</h2>

      <div className="bg-yellow-100 text-yellow-800 text-xs p-2 rounded mb-4">
        ⚠️ Hey! Please note that this is your saved Wishlist.
      </div>

      <div className="text-xs text-gray-500 mb-1">Last 6 months</div>

      {wishlist.map((item, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm mb-4 p-3">
          <div className="text-[11px] text-gray-400 mb-1">Wish ID : {item.productId}</div>

          <div className="flex items-center gap-3">
            <img
              src={AppwriteService.getFileViewUrl(item.images[0])} // Assuming the first image is used as the preview
              alt={item.header}
              className="w-20 h-30 object-cover rounded"
            />

            <div className="flex-1">
              <div className="font-semibold text-[13px] text-gray-800 mb-[2px]">
                {item.header}
              </div>

              <div className="text-gray-700 text-[13px] font-medium">
                {item.description}
              </div>

              <div className="text-gray-500 text-[12px]">
                Quantity: {item.quantity}
              </div>

              <div className="text-gray-500 text-[12px]">
                Size: {item.size}
              </div>

              <div className="text-gray-500 text-[12px]">
                Price: ${item.price}
              </div>

              <div className="text-gray-500 text-[12px]">
                Payment Status: {item.paymentStatus}
              </div>

              <div className="flex items-center gap-[2px] mt-1 text-yellow-400 text-xs">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    className={i < (item.rating || 0) ? "text-yellow-400" : "text-gray-300"}
                  />
                ))}
                <span className="ml-1 text-gray-500 text-[11px]">You rated</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    </Container>
  );
};

export default WishlistPage;