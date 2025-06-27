import axios from "axios";
import React, { useState, useEffect } from "react";
import { AppwriteService, Container, ENV_File } from "../../FilesPaths/all_path";
import {
  FaBoxOpen,
  FaRupeeSign,
  FaCheckCircle,
  FaStar,
  FaMapMarkerAlt,
  FaFileDownload,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const CANCEL_REASONS = [
  "Received damaged product",
  "Product not as described",
  "Wrong item delivered",
  "Poor quality",
  "Arrived late",
  "Size/fit issue",
  "Changed my mind",
];

const OrderPage = () => {
  const { userid } = useParams();
  const [orders, setOrders] = useState([]);
  const [ratings, setRatings] = useState({});
  const [addressMap, setAddressMap] = useState({});
  const [showCancelOptions, setShowCancelOptions] = useState({});
  const [selectedCancelReason, setSelectedCancelReason] = useState({});
  const [pendingCancelOrderId, setPendingCancelOrderId] = useState(null); // Track which order is being cancelled

  useEffect(() => {
    const fetchOrdersAndAddresses = async () => {
      try {
        const response = await axios.get(`${ENV_File.backendURL}/order`);
        // Show all orders for this user, not just paid
        const userOrders = response.data.filter(
          (order) => order.userId === userid
        );
        setOrders(userOrders);

        // Get unique address IDs
        const uniqueAddressIds = [...new Set(userOrders.map((order) => order.addressId))];

        // Fetch all addresses in parallel
        const addressRequests = uniqueAddressIds.map((id) =>
          axios.get(`${ENV_File.backendURL}/address/${id}`).then((res) => ({
            id,
            data: res.data,
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
  }, [userid]);

  const handleCancelOrder = (orderId) => {
    setShowCancelOptions((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
    setPendingCancelOrderId(orderId); // Set which order is being cancelled
  };

  // Cancel function as requested
  const cancelOrder = async (orderId, reason) => {
    if (!reason) {
      alert("Please select a reason for cancellation.");
      return;
    }
    try {
      const response = await axios.post(`${ENV_File.backendURL}/order/cancel`, {
        orderId,
        reason,
      });
      if (response.status === 200) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId
              ? { ...order, paymentStatus: "cancelled", cancelOrder: "yes", cancelReason: reason }
              : order
          )
        );
        setShowCancelOptions((prev) => ({ ...prev, [orderId]: false }));
        setPendingCancelOrderId(null); // Reset after cancel
        alert("Order cancelled successfully.");
      } else {
        alert(response.data.message || "Failed to cancel order");
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      alert(error.response?.data?.message || "Something went wrong while cancelling the order");
    }
  };

  const handleDownloadInvoice = async (order, address) => {
    if (!window.confirm("Do you want to download the invoice?")) {
      return;
    }
    const tempDiv = document.createElement("div");
    tempDiv.style.position = "fixed";
    tempDiv.style.left = "-9999px";
    tempDiv.style.top = "0";
    tempDiv.style.background = "#fff";
    tempDiv.style.padding = "24px";
    tempDiv.style.width = "600px";
    tempDiv.style.fontFamily = "sans-serif";
    tempDiv.innerHTML = `
      <div style="background:#fff;padding:24px;border-radius:12px;border:1px solid #eee;color:#111827;">
        <h1 style="font-size:2rem;font-weight:bold;color:#b91c1c;margin-bottom:8px;">INVOICE</h1>
        <p style="font-size:1rem;color:#6b7280;">Order ID: ${order._id}</p>
        <p style="font-size:1rem;color:#6b7280;">Date: ${new Date(order.createdAt).toLocaleDateString("en-GB")}</p>
        <hr style="margin:16px 0;" />
        <h2 style="font-size:1.1rem;font-weight:600;">Billed To:</h2>
        <p>${address?.data?.name || ""}</p>
        <p>${address?.data?.street || ""}, ${address?.data?.areaStreet || ""}, ${address?.data?.city || ""}, ${address?.data?.state || ""} - ${address?.data?.pincode || ""}</p>
        <p>${address?.data?.phoneNumber || ""}</p>
        <hr style="margin:16px 0;" />
        <table style="width:100%;border-collapse:collapse;">
          <thead>
            <tr style="background:#fee2e2;">
              <th style="padding:8px;border:1px solid #eee;">Product</th>
              <th style="padding:8px;border:1px solid #eee;">Size</th>
              <th style="padding:8px;border:1px solid #eee;">Qty</th>
              <th style="padding:8px;border:1px solid #eee;">Price</th>
              <th style="padding:8px;border:1px solid #eee;">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:8px;border:1px solid #eee;">${order.header}</td>
              <td style="padding:8px;border:1px solid #eee;">${order.size}</td>
              <td style="padding:8px;border:1px solid #eee;">${order.quantity}</td>
              <td style="padding:8px;border:1px solid #eee;">₹${order.price.toFixed(2)}</td>
              <td style="padding:8px;border:1px solid #eee;">₹${(order.price * order.quantity).toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
        <div style="text-align:right;margin-top:16px;">
          <p style="font-size:1.1rem;font-weight:600;">Total: ₹${(order.price * order.quantity).toFixed(2)}</p>
          <p style="font-size:0.95rem;color:#6b7280;">Thank you for shopping with us!</p>
        </div>
      </div>
    `;
    document.body.appendChild(tempDiv);

    const canvas = await html2canvas(tempDiv, {
      useCORS: true,
      backgroundColor: "#fff",
      scale: 2,
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
    pdf.save(`Invoice-${order._id}.pdf`);
    document.body.removeChild(tempDiv);
  };

  const handleRating = (orderId, value) => {
    setRatings((prev) => ({ ...prev, [orderId]: value }));
    // Optionally: axios.post(`/order/rate`, { orderId, rating: value });
  };

  return (
    <Container>
      <div
        className="sticky overflow-hidden pb-15 max-w-2xl mx-auto p-4 bg-gradient-to-br from-amber-50 via-white to-rose-50 rounded-md shadow-2xl "
        style={{
          minHeight: "84vh",
          maxHeight: "84vh",
          overflowY: "auto",
        }}
      >
        <h1 className="text-3xl font-extrabold mb-8 text-center text-rose-700 tracking-wide flex items-center justify-center gap-2 drop-shadow">
          <FaBoxOpen className="text-rose-500" /> Your Orders
        </h1>

        {orders.length === 0 ? (
          <div className="text-center text-gray-500 mt-16 text-lg">
            <FaBoxOpen className="text-5xl text-rose-200 mb-4 mx-auto animate-bounce overflow-hidden" />
            No paid orders found.
          </div>
        ) : (
        [...orders]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map((order, index) => {
      const address = addressMap[order.addressId];

            // Determine status text
            let statusText = "Paid";
            if (order.paymentStatus === "cancelled") {
              statusText = "Cancelled";
            } else if (order.cancelOrder === "yes") {
              statusText = "Cancellation in Progress";
            } else if (pendingCancelOrderId === order._id) {
              statusText = "Cancelling...";
            }

            return (
              <React.Fragment key={index}>
                {/* Order Card */}
                <div
                  className={`bg-white rounded-2xl mb-10 shadow-lg hover:shadow-2xl transition duration-300 p-4 border border-rose-100 relative overflow-auto ${pendingCancelOrderId === order._id ? "ring-2 ring-rose-500" : ""
                    }`}
                >
                  <div className={`absolute top-0 left-0 ${statusText === 'Paid' ? 'bg-green-300 text-green-900' : 'bg-rose-100 text-rose-700'} px-3 py-1 rounded-br-2xl text-xs font-bold shadow-sm`}>
                    {statusText}
                  </div>
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="w-32 h-40 bg-cover bg-no-repeat flex-shrink-0 rounded-xl bg-gray-100 overflow-hidden border border-rose-100 shadow">
                      {order.images && order.images.length > 0 ? (
                        <img
                          src={ENV_File.backendURL + order.images[0]}
                          alt={order.header}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-400 text-xs">
                          No Image
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-full ">
                      <div className="text-xs text-gray-400 mb-1 truncate">
                        Order ID: <span className="font-semibold break-all">{order._id}</span>
                      </div>
                      <h2 className="text-xl font-bold text-rose-700 mt-1 mb-1 truncate">{order.header}</h2>
                      <p className="text-sm text-gray-600 mb-2 break-words line-clamp-2">{order.description}</p>

                      <div className="grid grid-cols-2 justify-between text-sm gap-y-1 text-gray-700 mb-2">
                        <div className="flex  items-center gap-1 min-w-0">
                          <FaRupeeSign className="text-green-600 flex-shrink-0" />
                          <span className="truncate">
                            Price: <span className="font-semibold">₹{order.price.toFixed(2)}</span>
                          </span>
                        </div>
                        <div className="flex items-center gap-1 min-w-0">
                          <FaBoxOpen className="text-blue-600 flex-shrink-0" />
                          <span className="truncate">
                            Quantity: <span className="font-semibold">{order.quantity}</span>
                          </span>
                        </div>
                        <div className="flex items-center gap-1 min-w-0">
                          <span className="font-medium flex-shrink-0">Size:</span>
                          <span className="truncate">{order.size}</span>
                        </div>
                        <div className="flex items-center gap-1 min-w-0">
                          <span className="font-medium flex-shrink-0">Method:</span>
                          <span className="truncate">{order.buyingMehtod}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Address Display */}
                  {address ? (
                    <div className="mt-4 p-4 bg-gradient-to-r from-rose-50 via-amber-50 to-white rounded-xl text-sm text-gray-700 border border-rose-100 shadow flex flex-col md:flex-row md:items-center md:gap-6">
                      <div className="flex items-center gap-2 text-gray-600 mb-2 md:mb-0">
                        <FaMapMarkerAlt className="text-red-500" />
                        <span className="font-semibold">Delivery Address</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">{address.data.name}</div>
                        <div className="text-gray-700">
                          {address.data.areaStreet}, {address.data.city}, {address.data.state} - {address.data.pincode}
                        </div>
                        <div className="text-gray-700 flex"><p className="font-semibold">Phone: </p>{address.data.phoneNumber}</div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400 mt-2">Loading address...</p>
                  )}

                  <div className="mt-4 flex flex-wrap gap-4 justify-between items-center px-2">
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
                          className={`cursor-pointer transition-all duration-150 ${ratings[order._id] >= star ? "text-yellow-400 scale-110" : "text-gray-300"
                            }`}
                        />
                      ))}
                    </div>

                    {/* Download Invoice Button */}
                    <div className="flex items-center justify-between w-full gap-2 text-sm">
                      {/* Only show Invoice button if order is NOT cancelled */}
                      {order.paymentStatus !== "cancelled" && (
                        <button
                          onClick={() => handleDownloadInvoice(order, address)}
                          className="flex items-center gap-2 bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:scale-105 hover:bg-rose-700 transition-all duration-200"
                        >
                          <FaFileDownload className="text-sm" />
                          Invoice
                        </button>
                      )}
                      {order.paymentStatus !== "cancelled" && (
                        <div className="flex flex-col gap-2 w-full max-w-xs">
                          <button
                            onClick={() => handleCancelOrder(order._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold shadow transition-all duration-200"
                          >
                            Cancel Order
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  {showCancelOptions[order._id] && (
                    <div className="mb-4 mt-4 bg-rose-50 border border-rose-200 rounded-lg p-3 shadow">
                      <label className="block text-sm font-semibold mb-2 text-rose-700">
                        Select a reason to cancel your order:
                      </label>
                      <select
                        className="w-full border border-rose-300 rounded p-2 mb-2"
                        value={selectedCancelReason[order._id] || ""}
                        onChange={e =>
                          setSelectedCancelReason(prev => ({
                            ...prev,
                            [order._id]: e.target.value,
                          }))
                        }
                      >
                        <option value="">-- Select Reason --</option>
                        {CANCEL_REASONS.map((reason, idx) => (
                          <option key={idx} value={reason}>
                            {reason}
                          </option>
                        ))}
                      </select>
                      <button
                        className="w-full bg-rose-600 hover:bg-rose-700 text-white py-2 rounded font-semibold transition"
                        onClick={() => cancelOrder(order._id, selectedCancelReason[order._id])}
                      >
                        Confirm Cancel
                      </button>
                      {/* Show which order is being cancelled */}
                      {pendingCancelOrderId === order._id && (
                        <div className="mt-2 text-xs text-rose-700 font-semibold text-center">
                          Cancelling Order ID: {order._id}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </React.Fragment>
            );
          })
        )}
      </div>
    </Container>
  );
};

export default OrderPage;