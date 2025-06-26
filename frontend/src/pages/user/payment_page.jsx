import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { ENV_File } from "../../FilesPaths/all_path";

export default function PayNow() {
  const [payment, setPaymentState] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const { amount, userid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (payment) {
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(countdownInterval);
            setTimeout(() => {
              navigate(`/myorders/${userid}`);
            }, 0);
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(countdownInterval);
    }
  }, [payment, navigate, userid]);

  const handlePayment = async () => {
    try {
      const response = await axios.post(`${ENV_File.backendURL}/payment/request`, {
        amount: amount,
      });

      const orderData = response.data;

      const options = {
        key: `${ENV_File.razor_key_id}`,
        amount: orderData.amount,
        currency: "INR",
        name: "Khuwab Collection",
        description: `Pay ₹${amount} to complete your purchase`,
        order_id: orderData.id,
        handler: async function (response) {
          try {
            await axios.post(`${ENV_File.backendURL}/payment/verify`, {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            });
            setPaymentState(true);
          } catch (error) {
            console.error("Verification error:", error.response?.data || error.message);
            alert("Payment verification failed. Please try again.");
          }
        },
        prefill: {
          name: "User Name",
          email: "user@example.com",
          contact: "9876543210",
        },
        theme: {
          color: "#ff6b6b",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-white to-gray-100">
      <div className="absolute inset-0 bg-black/10  z-0"></div>

      <div className="relative z-10 flex-grow flex items-center justify-center px-4 py-8">
        <div className="backdrop-blur-2xl bg-white  shadow-2xl rounded-xl p-8 max-w-md w-full text-center text-gray-800">
          <div className="text-pink-600 text-4xl mb-4 flex justify-center">
            <FaShoppingCart />
          </div>
          <h2 className="text-2xl font-bold mb-2">Complete Your Purchase</h2>
          <p className="mb-6 text-gray-600">
            You're one step away from owning your favorite item. Confirm your payment below.
          </p>

          {payment ? (
            <>
              <p className="text-green-600 font-semibold text-lg mb-4">
                ✅ Payment successful! Thank you for shopping with us.
              </p>
              <p className="text-yellow-600 text-sm">
                Redirecting to your orders in {countdown} seconds...
              </p>
            </>
          ) : (
            <button
              onClick={handlePayment}
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg transition duration-200"
            >
              Pay ₹{amount} Now
            </button>
          )}

          <p className="text-xs text-gray-500 mt-4">
            You'll be redirected to Razorpay for secure checkout.
          </p>

          <button
            onClick={() => navigate(-1)}
            className="mt-6 text-pink-600 hover:underline"
          >
            ← Back to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
