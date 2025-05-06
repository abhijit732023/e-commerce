import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AppwriteService, ENV_File } from "../../FilesPaths/all_path.js";

const CartPage = () => {
  const { userid } = useParams();
  const [order, setorder] = useState([]);

  useEffect(() => {
    const fetch_order = async () => {
      try {
        const response = await axios.get(`${ENV_File.backendURL}/order/${userid}`);
        setorder(response.data);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };
    fetch_order();
  }, [userid]);

  const updateQuantity = (id, change) => {
    setorder((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleRemove = async () => {
    try {
      await axios.delete(`${ENV_File.backendURL}/order/${userid}`);
      setorder([]); // Clear the local cart after deletion
    } catch (err) {
      console.error("Failed to remove item", err);
    }
  };

  const total = order.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const savings = order.reduce((sum) => sum + 1499, 0); // fake saving calc
  const deliveryFee = 29;
  const amountPayable = total + deliveryFee;

  return (
    <div className="max-w-4xl mx-auto p-4 text-sm font-sans">
      {/* Address */}
      <div className="border-b pb-2 mb-4 flex justify-between items-center">
        <p className="font-semibold">Abhijit | Room no 7, Sion Dharavi... 400017</p>
        <button className="text-blue-600 font-medium">Change</button>
      </div>

      {/* Offer Banner */}
      <div className="bg-blue-100 border border-blue-300 text-blue-700 p-3 rounded-md mb-4 text-center text-xs font-medium">
        🎉 YAY! REDEEM 100% OF YOUR EARNED CASHBACK. KEEP SHOPPING, KEEP EARNING 15% CASHBACK!
      </div>

      {/* Cart Products */}
      <div className="space-y-6">
        {order.length === 0 ? (
          <div className="text-center py-20 text-gray-500 text-base font-medium">
            🛒 No products added to cart yet.
          </div>
        ) : (
          order.map((item) => (
            <div
              key={item._id}
              className="flex border border-gray-200 rounded-md p-3 shadow-sm"
            >
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
                <div className="text-xs mb-2">
                  Qty:{" "}
                  <select
                    className="border px-1 text-sm"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item._id, parseInt(e.target.value) - item.quantity)
                    }
                  >
                    {[1, 2, 3, 4, 5].map((q) => (
                      <option key={q} value={q}>
                        {q}
                      </option>
                    ))}
                  </select>
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
                    onClick={() => handleRemove()}
                  >
                    🗑️ Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Show rest of the sections only if cart is not empty */}
      {order.length > 0 && (
        <>
          {/* Apply Coupon */}
          <div className="border-t mt-6 pt-4 flex items-center justify-between">
            <p className="text-sm font-medium">Apply coupon</p>
            <button className="text-blue-600 text-sm font-semibold">Select</button>
          </div>

          {/* SuperCash */}
          <div className="text-xs text-green-700 bg-green-50 p-2 mt-2 rounded">
            🎁 You are earning ₹122 SuperCash! Will be credited 15 days after delivery.
          </div>

          {/* Redemption */}
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

          {/* Checkout */}
          <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t shadow-md flex justify-between items-center z-50 max-w-4xl mx-auto">
  <div>
    <p className="text-xs text-green-700">🎉 Cheers! You saved ₹{savings.toFixed(2)}</p>
    <p className="text-lg font-bold">₹{amountPayable.toFixed(2)}</p>
  </div>
  <button className="bg-black text-white px-6 py-2 rounded-md font-semibold">
    Proceed to Payment
  </button>
</div>
        </>
      )}
    </div>
  );
};

export default CartPage;
