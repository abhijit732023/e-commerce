import React, { useState } from "react";

const PaymentPage = () => {
  const [selectedMethod, setSelectedMethod] = useState("upi");

  const order = {
    total: 816,
    address: {
      name: "Abhijit",
      line: "Room No 7, Sion Dharavi, 400017",
      phone: "1234567890",
    },
  };

  const handlePayment = () => {
    alert(`Proceeding with ${selectedMethod.toUpperCase()} payment...`);
    // Integrate Razorpay or your chosen gateway here
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Select Payment Method</h2>

        {/* Address */}
        <div className="border p-4 rounded mb-6">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Deliver To</h3>
            <button className="text-blue-600 text-sm hover:underline">Change</button>
          </div>
          <p className="text-gray-700 mt-1">
            {order.address.name}, {order.address.line}, {order.address.phone}
          </p>
        </div>

        {/* Payment Methods */}
        <div className="space-y-4">
          {[
            { id: "upi", label: "UPI" },
            { id: "card", label: "Credit / Debit Card" },
            { id: "wallet", label: "Wallets" },
            { id: "cod", label: "Cash on Delivery" },
          ].map((method) => (
            <div
              key={method.id}
              className={`border p-4 rounded cursor-pointer ${
                selectedMethod === method.id ? "border-blue-500 bg-blue-50" : "border-gray-300"
              }`}
              onClick={() => setSelectedMethod(method.id)}
            >
              <label className="flex items-center">
                <input
                  type="radio"
                  name="payment"
                  checked={selectedMethod === method.id}
                  onChange={() => setSelectedMethod(method.id)}
                  className="mr-3"
                />
                {method.label}
              </label>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-6 border-t pt-4 text-right">
          <p className="text-lg font-semibold mb-2">Total Payable: ₹{order.total}</p>
          <button
            onClick={handlePayment}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
