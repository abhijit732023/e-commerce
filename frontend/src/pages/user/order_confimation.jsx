import axios from "axios";
import React, { useState, useEffect } from "react";
import { AppwriteService, Container, ENV_File } from "../../FilesPaths/all_path";
import { FaBoxOpen, FaRupeeSign, FaCheckCircle, FaStar, FaMapMarkerAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";

const OrderPage = () => {
  const{userid}=useParams()
  const [orders, setOrders] = useState([]);
  const [ratings, setRatings] = useState({});
  const [addressMap, setAddressMap] = useState({});

  useEffect(() => {
    const fetchOrdersAndAddresses = async () => {
      try {
        const response = await axios.get(`${ENV_File.backendURL}/order`);
        const paidOrders = response.data.filter(order => order.paymentStatus === "paid"&&order.userId===userid);
        setOrders(paidOrders);

        // Get unique address IDs
        const uniqueAddressIds = [...new Set(paidOrders.map(order => order.addressId))];

        // Fetch all addresses in parallel
        const addressRequests = uniqueAddressIds.map(id =>
          axios.get(`${ENV_File.backendURL}/address/${id}`).then(res => ({
            id,
            data: res.data
          }))
        );

        const addressResults = await Promise.all(addressRequests);

        // Map addressId to address object
        const addressMapTemp = {};
        addressResults.forEach(({ id, data }) => {
          addressMapTemp[id] = data;
        });

        setAddressMap(addressMapTemp);
      } catch (error) {
        console.error("Error fetching orders or addresses:", error);
      }
    };

    fetchOrdersAndAddresses();
  }, []);

  const handleRating = (orderId, value) => {
    setRatings(prev => ({ ...prev, [orderId]: value }));
    // Optionally: axios.post(`/order/rate`, { orderId, rating: value });
  };

  return (
    <Container>
      <div className="max-w-2xl mx-auto p-4 bg-gradient-to-br from-amber-50 via-white to-rose-50 min-h-screen rounded-2xl shadow-xl">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-rose-700 tracking-wide flex items-center justify-center gap-2">
          <FaBoxOpen className="text-rose-500" /> Your Orders
        </h1>

        {orders.length === 0 ? (
          <div className="text-center text-gray-500 mt-16 text-lg">
            <FaBoxOpen className="text-5xl text-rose-200 mb-4 mx-auto animate-bounce overflow-hidden" />
            No paid orders found.
          </div>
        ) : (
          orders.map((order, index) => {
            const address = addressMap[order.addressId];

            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition duration-300 p-5 mb-8 border border-rose-100"
              >
                <div className="flex items-center gap-5">
                  <div className="w-30 h-40 bg-cover bg-no-repeat flex-shrink-0 rounded-md bg-gray-100 overflow-hidden border border-rose-100 shadow">
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
                    <div className="text-xs text-gray-400 mb-1">Order ID: <span className="font-semibold">{order._id}</span></div>
                    <h2 className="text-xl font-bold text-rose-700 mt-1 mb-1">{order.header}</h2>
                    <p className="text-sm text-gray-600 mb-2">{order.description}</p>

                    <div className="grid grid-cols-2 text-sm gap-y-1 text-gray-700 mb-2">
                      <div className="flex items-center gap-1">
                        <FaRupeeSign className="text-green-600" />
                        <span>Price: <span className="font-semibold">₹{order.price.toFixed(2)}</span></span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaBoxOpen className="text-blue-600" />
                        <span>Quantity: <span className="font-semibold">{order.quantity}</span></span>
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

                {/* Address Display */}
                {address ? (
                  <div className="mt-4 p-4 bg-gradient-to-r from-rose-50 via-amber-50 to-white rounded-xl text-sm text-gray-700 border border-rose-100 shadow">
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <FaMapMarkerAlt className="text-red-500" />
                      <span className="font-semibold">Delivery Address</span>
                    </div>
                    <div className="font-semibold text-gray-800">{address.data.name}</div>
                    <div className="text-gray-700">
                      {address.data.street}, {address.data.areaStreet}, {address.data.city}, {address.data.state} - {address.data.pincode}
                    </div>
                    <div className="text-gray-700">Phone: {address.data.phoneNumber}</div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 mt-2">Loading address...</p>
                )}

                <div className="mt-4 flex justify-between items-center px-2">
                  <span className="text-green-600 text-sm flex items-center gap-1 font-semibold">
                    <FaCheckCircle />
                    Payment: Paid
                  </span>

                  {/* ⭐ Star Rating UI */}
                  <div className="flex gap-1 items-center">
                    <span className="ml-2 text-xs text-gray-500">Rate</span>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        onClick={() => handleRating(order._id, star)}
                        className={`cursor-pointer transition-all duration-150 ${
                          ratings[order._id] >= star ? "text-yellow-400 scale-110" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </Container>
  );
};

export default OrderPage;