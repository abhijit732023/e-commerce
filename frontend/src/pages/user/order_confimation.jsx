import axios from "axios";
import React, { useState, useEffect } from "react";
import { AppwriteService, Container, ENV_File } from "../../FilesPaths/all_path";
import { FaBoxOpen, FaRupeeSign, FaCheckCircle, FaStar } from "react-icons/fa";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [ratings, setRatings] = useState({}); // store ratings locally

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${ENV_File.backendURL}/order`);
        const filtered = response.data.filter(order => order.paymentStatus === "paid");
        setOrders(filtered);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const handleRating = (orderId, value) => {
    setRatings(prev => ({ ...prev, [orderId]: value }));

    // Optional: Send rating to backend
    // axios.post(`${ENV_File.backendURL}/order/rate`, { orderId, rating: value });
  };

  return (
    <Container>
      <div className="max-w-2xl mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">🛒 Your Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center text-gray-600 mt-10">No paid orders found.</div>
      ) : (
        orders.map((order, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow hover:shadow-md transition duration-300 p-4 mb-6 border border-gray-200"
          >
            <div className="flex items-center gap-4">
              <div className="w-20 h-30 bg-cover bg-no-repeat flex-shrink-0 rounded-lg bg-gray-100 overflow-hidden">
                {order.images && order.images.length > 0 ? (
                  <img
                    src={AppwriteService.getFileViewUrl(order.images[0])}
                    alt={order.header}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 text-xs">
                    No Image
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="text-sm text-gray-500">Order ID: {order._id}</div>
                <h2 className="text-lg font-semibold text-gray-800 mt-1">{order.header}</h2>
                <p className="text-sm text-gray-600 mb-2">{order.description}</p>

                <div className="grid grid-cols-2 text-sm gap-y-1 text-gray-700">
                  <div className="flex items-center gap-1">
                    <FaRupeeSign className="text-green-600" />
                    <span>Price: ₹{order.price.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaBoxOpen className="text-blue-600" />
                    <span>Quantity: {order.quantity}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">Size:</span>
                    <span>{order.size}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">Method:</span>
                    <span>{order.buyingMehtod}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 flex justify-between items-center px-2">
              <span className="text-green-600 text-sm flex items-center gap-1 font-medium">
                <FaCheckCircle />
                Payment: Paid
              </span>

              {/* ⭐ Star Rating UI */}
              <div className="flex gap-1 items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    onClick={() => handleRating(order._id, star)}
                    className={`cursor-pointer ${
                      ratings[order._id] >= star ? "text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
    </Container>
  );
};

export default OrderPage;
