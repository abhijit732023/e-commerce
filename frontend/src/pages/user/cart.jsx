import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useLocation } from "react-router-dom";
import { AddressForm, AppwriteService, Container, ENV_File } from "../../FilesPaths/all_path.js";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { userid } = useParams();
  const navigate = useNavigate();
  const [localQuantities, setLocalQuantities] = useState({});
  const [order, setOrder] = useState([]);
  const [initialQuantities, setInitialQuantities] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [singleItem, setsingleItem] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [AddressId, setAddressId] = useState(null);
  const [Addressdata, setAddressdata] = useState();

    const location = useLocation();
  const addressId = location.state?.address_id;

  useEffect(() => {
    try {
      if (addressId) {
        setAddressId(addressId);
      console.log(addressId);
      const fetchaddressdata=async()=>{
        const response = await axios.get(`${ENV_File.backendURL}/address/${addressId}`);
        console.log('datatata',response.data);
        setAddressdata(response.data.data);
        
      }
      fetchaddressdata();
      
      
    }
      
    } catch (error) {
      
    }
  }, [addressId]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const openRemoveConfirm = (id) => {
    setSelectedItemId(id);
    setShowConfirmModal(true);
  };

// if (addressId) {
//   setAddressId(addressId)
  
// }
  

  const handleRemove = async (id) => {
    try {
      await axios.delete(`${ENV_File.backendURL}/order/${userid}`);
      setOrder((prev) => prev.filter((item) => item._id !== id));
      setShowConfirmModal(false);
      setSelectedItemId(null);
    } catch (err) {
      console.error("Failed to remove item", err);
    }
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`${ENV_File.backendURL}/order/${userid}`);
        const orderData = response.data.filter((item) => item.paymentStatus === "pending");
        const filteredOrder = orderData.filter((item) => item.userId === userid);
        setOrder(filteredOrder);

        const quantities = {};
        response.data.forEach((item) => {
          quantities[item._id] = item.quantity;
        });

        const savedQuantities = JSON.parse(localStorage.getItem("localQuantities")) || {};
        const mergedQuantities = { ...quantities, ...savedQuantities };

        setInitialQuantities(quantities);
        setLocalQuantities(mergedQuantities);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };
    fetchOrder();
  }, []);

  const handlewish = async () => {
    try {
      const response = await axios.get(`${ENV_File.backendURL}/order/single-item/${selectedItemId}`);
      const itemToSend = response.data[0];
      if (itemToSend) {
        const { _id, __v, ...wishlistItem } = itemToSend;
        const res = await axios.post(`${ENV_File.backendURL}/wishlist/add`, wishlistItem);
        if (res) {
          await axios.delete(`${ENV_File.backendURL}/order/${userid}`);
          setOrder((prev) => prev.filter((item) => item._id !== selectedItemId));
          setShowConfirmModal(false);
          setSelectedItemId(null);
        }
      }
    } catch (error) {
      console.error('Error in handlewish:', error);
    }
  };

  const updateQuantity = (id, change) => {
    setLocalQuantities((prev) => {
      const currentQuantity = prev[id] || 1;
      const minQuantity = initialQuantities[id] || 1;
      const newQuantity = Math.max(minQuantity, currentQuantity + change);
      const updatedQuantities = {
        ...prev,
        [id]: newQuantity,
      };
      localStorage.setItem("localQuantities", JSON.stringify(updatedQuantities));
      return updatedQuantities;
    });
  };

  const total = order.reduce((sum, item) => {
    const quantity = localQuantities[item._id] || item.quantity || 1;
    return sum + item.price * quantity;
  }, 0);
  const savings = order.reduce((sum) => sum + 1499, 0);
  const deliveryFee = 29;
  const amountPayable = total + deliveryFee;

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const payment = async () => {
    if (!AddressId) {
      alert("Please select an address before proceeding to payment.");
      return;
    }

    const res = await loadRazorpayScript();

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      const response = await axios.post(`${ENV_File.backendURL}/payment/request`, {
        amount: amountPayable,
      });

      const orderData = response.data;

      const options = {
        key: ENV_File.razor_key_id,
        amount: orderData.amount,
        currency: "INR",
        name: "E-Commerce Payment",
        description: `Pay ₹${amountPayable} for your order`,
        order_id: orderData.id,
        handler: async function (response) {
          try {
            const resp = await axios.post(`${ENV_File.backendURL}/payment/verify`, {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              userid: userid,
              addressId: AddressId,
              orderId: order.map((item) => item._id),
            });
            if (resp.data.success) {
              setTimeout(() => {
                alert("Redirecting to order page...");
                navigate(`/order/${userid}`);
              }, 3000);
            }
          } catch (error) {
            alert("Payment verification failed. Please try again.");
          }
        },
        prefill: {
          name: "User Name",
          email: "user@example.com",
          contact: "9876543210",
        },
        theme: {
          color: "#e11d48",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      className="h-[95vh] overflow-y-scroll" // changed from h-[80vh] to h-[95vh]
      >
        <div className="max-w-4xl min-h-screen mx-auto p-4 bg-gradient-to-br from-amber-50 via-white to-rose-50 rounded-2xl shadow-xl text-sm font-sans pb-5">
          {/* Address Bar */}
          <div className="border-b pb-2 mb-4 flex justify-between items-center">
            <p className="font-semibold text-rose-700 flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-rose-600 rounded-full animate-pulse"></span>
              Abhijit | Room no 7, Sion Dharavi... 400017
            </p>
            <button className="text-blue-600 font-medium hover:underline">
              <Link to={`/address/${userid}`}>Change</Link>
            </button>
          </div>
          {showAddressForm && (
            <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
              <motion.div
                className="bg-white rounded-xl shadow-2xl max-w-lg w-full relative p-6"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <button
                  className="absolute z-50 top-2 left-2 text-blue-500 font-semibold hover:text-gray-900 pt-8 text-xl"
                  onClick={() => setShowAddressForm(false)}
                  aria-label="Back to Cart"
                >
                  Back to cart
                </button>
                <AddressForm />
              </motion.div>
            </div>
          )}

          {/* Cashback Banner */}
          <div className="bg-gradient-to-r from-rose-100 via-amber-100 to-white border border-rose-200 text-rose-700 p-3 rounded-lg mb-4 text-center text-xs font-semibold shadow-sm">
            🎉 REDEEM 100% OF YOUR EARNED CASHBACK. KEEP SHOPPING, KEEP EARNING 15% CASHBACK!
          </div>

          {/* Cart Items */}
          <div className="space-y-6">
            {order.length === 0 ? (
              <div className="text-center py-20 text-gray-400 text-base font-medium">
                🛒 No products added to cart yet.
              </div>
            ) : (
              order.map((item) => (
                item.paymentStatus === "pending" && (
                  <motion.div
                    key={item._id}
                    className="flex border border-rose-100 rounded-xl p-3 shadow-md bg-white/90 hover:shadow-lg transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <img
                      src={AppwriteService.getFileViewUrl(item.images[0])}
                      alt="product"
                      className="w-24 h-32 object-cover rounded-lg border border-rose-100"
                    />
                    <div className="ml-4 flex-1">
                      <h2 className="font-semibold text-base text-rose-700">{item.header}</h2>
                      <p className="text-gray-500 text-xs mb-1">{item.description}</p>
                      <div className="text-xs mb-2">
                        <span className="font-medium text-gray-700">Size:</span> {item.size}
                      </div>
                      <div className="text-xs mb-2 flex items-center gap-2">
                        <span className="font-medium text-gray-700">Qty:</span>
                        <button
                          className="border px-2 py-1 text-sm rounded hover:bg-rose-100"
                          onClick={() => updateQuantity(item._id, -1)}
                          disabled={localQuantities[item._id] <= (initialQuantities[item._id] || 1)}
                        >
                          -
                        </button>
                        <span className="px-2">{localQuantities[item._id]}</span>
                        <button
                          className="border px-2 py-1 text-sm rounded hover:bg-rose-100"
                          onClick={() => updateQuantity(item._id, 1)}
                        >
                          +
                        </button>
                      </div>

                      <div className="flex justify-between items-center mt-2">
                        <div>
                          <p className="text-green-700 font-bold text-sm">
                            ₹{item.price} <span className="line-through text-gray-400 ml-1">₹1999</span>
                          </p>
                          <p className="text-xs text-green-700">You save ₹1,560</p>
                          <p className="text-xs text-gray-500 mt-1">Delivery by {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                        </div>
                        <button
                          className="text-red-500 text-sm border mt-4 px-2 py-2 rounded hover:bg-red-50"
                          onClick={() => openRemoveConfirm(item._id)}
                        >
                          🗑️ Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )
              ))
            )}
          </div>

          {/* Coupon and Savings */}
          {order.length > 0 && (
            <>
              <div className="border-t mt-6 pt-4 flex items-center justify-between">
                <p className="text-sm font-medium">Apply coupon</p>
                <button className="text-blue-600 text-sm font-semibold hover:underline">Select</button>
              </div>

              <div className="text-xs text-green-700 bg-green-50 p-2 mt-2 rounded">
                🎁 You are earning ₹122 SuperCash! Will be credited 15 days after delivery.
              </div>

              <div className="border-t mt-4 pt-4">
                <h3 className="font-semibold mb-2 text-sm">Redemption Options</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <input type="radio" disabled />
                    <span>You have no Loyalty Points at the moment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="radio" />
                    <span>You are eligible to use ₹75.20 of ₹75.20</span>
                  </div>
                </div>
              </div>

              {/* Order Details */}
              <div className="border-t mt-6 pt-4 pb-20">
                <h3 className="font-semibold text-sm mb-3">Order Details</h3>
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span>Bag Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-green-700">
                    <span>Bag Savings</span>
                    <span>-₹{savings.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>₹{deliveryFee}</span>
                  </div>
                  <div className="flex justify-between font-bold border-t pt-2">
                    <span>Amount Payable</span>
                    <span>₹{amountPayable.toFixed(2)}</span>
                  </div>
                  <div className=" fixed bottom-17 left-0 right-0 bg-white p-4 border-t  flex justify-between items-center  max-w-4xl mx-auto ">
                <div>
                  <p className="text-xs text-green-700">🎉 Cheers! You saved ₹{savings.toFixed(2)}</p>
                  <p className="text-lg font-bold text-rose-700">₹{amountPayable.toFixed(2)}</p>
                </div>
                <button
                  onClick={payment}
                  className="bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 text-white px-6 py-2 rounded-xl font-semibold shadow hover:scale-105 transition-all duration-200"
                >
                  Proceed to Payment
                </button>
              </div>
                </div>
              </div>

              {/* Bottom Bar */}
              
            </>
          )}

          {/* Remove Confirmation Modal */}
          <AnimatePresence>
            {showConfirmModal && (
              <motion.div
                className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="bg-white rounded-xl p-8 w-96 shadow-2xl text-center border border-rose-200"
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <h2 className="text-lg font-bold mb-4 text-rose-700">Remove item from cart?</h2>
                  <p className="text-gray-700 text-sm mb-6">
                    Are you sure you want to remove this item?
                  </p>
                  <div className="flex justify-center gap-4">
                    <button
                      className="bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200 shadow-sm"
                      onClick={() => setShowConfirmModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200 shadow-sm"
                      onClick={() => {
                        handlewish();
                        alert("Successfully Added To Wishlist");
                        setShowConfirmModal(false);
                      }}
                    >
                      Wishlist
                    </button>
                    <button
                      className="bg-rose-600 text-white px-4 py-2 rounded hover:bg-rose-700 shadow-md"
                      onClick={() => handleRemove(selectedItemId)}
                    >
                      Remove
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </Container>
  );
};

export default CartPage;