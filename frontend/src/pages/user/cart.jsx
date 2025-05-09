import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { AddressForm,AppwriteService, ENV_File } from "../../FilesPaths/all_path.js";
import { motion, AnimatePresence } from "framer-motion";


const CartPage = () => {
  const { userid } = useParams();
  const [order, setOrder] = useState([]);
  const [initialQuantities, setInitialQuantities] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [singleItem, setsingleItem] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);

  const openRemoveConfirm = (id) => {
    setSelectedItemId(id);
    setShowConfirmModal(true);
  };

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
        console.log(response.data);

        setOrder(response.data);
        // Set initial quantities for each item
        const quantities = {};
        response.data.forEach(item => {
          quantities[item._id] = item.quantity;
        });
        setInitialQuantities(quantities);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };
    fetchOrder();
  }, [userid]);

  const handlewish = async () => {
    console.log('selected', selectedItemId);
    try {
      const response = await axios.get(`${ENV_File.backendURL}/order/single-item/${selectedItemId}`);
      const itemToSend = response.data[0];
      if (itemToSend) {
        console.log('single', itemToSend);
        // Remove _id and __v fields before sending to wishlist
        const { _id, __v, ...wishlistItem } = itemToSend;
        const res = await axios.post(`${ENV_File.backendURL}/wishlist/add`, wishlistItem);
        console.log('wishlist add response:', res);
        
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
  }


  const updateQuantity = async (id, change) => {
    try {
      console.log(id);
      
      const item = order.find((item) => item._id === id);
      if (!item) return;

      const newQuantity = Math.max(1, item.quantity + change);

      // Update quantity in backend database
      await axios.put(`${ENV_File.backendURL}/order/${id}`, { quantity: newQuantity });

      // Update quantity in local state
      setOrder((prev) =>
        prev.map((item) =>
          item._id === id
            ? { ...item, quantity: newQuantity }
            : item
        )
      );

      // Do not update initialQuantities here to keep the original initial quantity
      // setInitialQuantities((prev) => ({
      //   ...prev,
      //   [id]: newQuantity,
      // }));
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const total = order.reduce((sum, item) => sum + item.price * item.quantity, 0);
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
    const res = await loadRazorpayScript();

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      const response = await axios.post(`${ENV_File.backendURL}/payment/create-order`, { amount: amountPayable }); // amount in paise
      console.log(response.data);

      const { order } = response.data; // assuming backend sends order details in response.data.order

      const options = {
        key: ENV_File.razor_secret_key, // Enter the Key ID generated from the Razorpay Dashboard
        amount: amountPayable*100,
        currency: order.currency,
        name: "Your Company Name",
        description: "Test Transaction",
        order_id: order._id,
        handler: function (response) {
          alert("Payment successful. Payment ID: " + response.razorpay_payment_id);
          // You can also verify the payment on the backend here
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Customer Address",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.log(error);
      alert("Payment failed. Please try again.");
    }
  };


  return (
    <div className="max-w-4xl mx-auto p-4 text-sm font-sans overflow-scroll">
      <div className="border-b pb-2 mb-4 flex justify-between items-center">
        <p className="font-semibold">Abhijit | Room no 7, Sion Dharavi... 400017</p>
        <button className="text-blue-600 font-medium" onClick={() => setShowAddressForm(true)}>Change</button>
      </div>

      {showAddressForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg max-w-lg w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold text-xl"
              onClick={() => setShowAddressForm(false)}
              aria-label="Close Address Form"
            >
              &times;
            </button>
            <AddressForm />
          </div>
        </div>
      )}

      <div className="bg-blue-100 border border-blue-300 text-blue-700 p-3 rounded-md mb-4 text-center text-xs font-medium">
        🎉 YAY! REDEEM 100% OF YOUR EARNED CASHBACK. KEEP SHOPPING, KEEP EARNING 15% CASHBACK!
      </div>

      <div className="space-y-6">
        {order.length === 0 ? (
          <div className="text-center py-20 text-gray-500 text-base font-medium">
            🛒 No products added to cart yet.
          </div>
        ) : (
          order.map((item) => (
            <div key={item._id} className="flex border border-gray-200 rounded-md p-3 shadow-sm">
              <img
                src={AppwriteService.getFileViewUrl(item.images[0])}
                alt="product"
                className="w-24 h-38 object-cover rounded"
              />
              <div className="ml-4 flex-1">
                <h2 className="font-semibold text-sm">{item.header}</h2>
                <p className="text-gray-500 text-xs mb-1">{item.description}</p>
                <div className="text-xs mb-2">
                  <span className="font-medium text-gray-700">Size:</span> {item.size}
                </div>
                <div className="text-xs mb-2 flex items-center gap-2">
                  <span className="font-medium text-gray-700">Qty:</span>
                  <button
                    className="border px-2 py-1 text-sm rounded hover:bg-gray-200"
                    onClick={() => updateQuantity(item._id, -1)}
                    disabled={item.quantity <= (initialQuantities[item._id] || 1)}
                  >
                    -
                  </button>
                  <span className="px-2">{item.quantity}</span>
                  <button
                    className="border px-2 py-1 text-sm rounded hover:bg-gray-200"
                    onClick={() => updateQuantity(item._id, 1)}
                  >
                    +
                  </button>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-green-700 font-bold text-sm">
                      ₹{item.price}{" "}
                      <span className="line-through text-gray-400 ml-1">₹1999</span>
                    </p>
                    <p className="text-xs text-green-700">You save ₹1,560</p>
                    <p className="text-xs text-gray-500 mt-1">Delivery by 12 May</p>
                  </div>
                  <button
                    className="text-red-500 text-sm border mt-4 px-2 py-2 rounded hover:bg-red-50"
                    onClick={() => openRemoveConfirm(item._id)}
                  >
                    🗑️ Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {order.length > 0 && (
        <>
          <div className="border-t mt-6 pt-4 flex items-center justify-between">
            <p className="text-sm font-medium">Apply coupon</p>
            <button className="text-blue-600 text-sm font-semibold">Select</button>
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

          <div className="border-t mt-6 pt-4 pb-15">
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
            </div>
          </div>

          <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t shadow-md flex justify-between items-center z-50 max-w-4xl mx-auto">
            <div>
              <p className="text-xs text-green-700">🎉 Cheers! You saved ₹{savings.toFixed(2)}</p>
              <p className="text-lg font-bold">₹{amountPayable.toFixed(2)}</p>
            </div>
              <button onClick={payment} className="bg-black text-white px-6 py-2 rounded-md font-semibold">
                Proceed to Payment
              </button>

          </div>
        </>
      )}

      {/* 🧾 Custom Remove Confirmation Modal */}
      <AnimatePresence>
        {showConfirmModal && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-md p-6 w-96 shadow-lg text-center border border-gray-300"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <h2 className="text-lg font-semibold mb-4 text-red-600">Remove item from cart?</h2>
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
                    handlewish()
                    alert("Successfully Added To Wishlist");
                    setShowConfirmModal(false);
                  }}
                >
                  Wishlist
                </button>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 shadow-md"
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
  );
};

export default CartPage;
