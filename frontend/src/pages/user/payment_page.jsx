import React, { useState } from "react";

const PaymentPage = () => {
  const [selectedMethod, setSelectedMethod] = useState("upi");
  const [upiId, setUpiId] = useState("8976350904@fam");
  const [upiApp, setUpiApp] = useState("gpay");

  const order = {
    amount: 100,
    name: "Abhijit",
  };

  const handlePayNow = () => {
    if (selectedMethod === "upi") {
      const upiLink = `upi://pay?pa=8976350904@fam&pn=Abhijit&am=100&cu=INR
`;
      window.location.href = upiLink; // This should trigger UPI app like GPay
    } else {
      alert("Other payment methods not implemented in demo.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Choose Payment Method</h2>

        {/* UPI Option */}
        <div
          className={`border p-4 rounded cursor-pointer ${
            selectedMethod === "upi" ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
          onClick={() => setSelectedMethod("upi")}
        >
          <label className="flex items-center">
            <input
              type="radio"
              name="payment"
              checked={selectedMethod === "upi"}
              onChange={() => setSelectedMethod("upi")}
              className="mr-3"
            />
            UPI
          </label>

          {selectedMethod === "upi" && (
            <div className="mt-4 space-y-3">
              <label className="block text-sm">Enter your UPI ID:</label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="border p-2 rounded w-full"
              />

              <label className="block text-sm mt-2">Select UPI App:</label>
              <select
                className="border p-2 rounded w-full"
                value={upiApp}
                onChange={(e) => setUpiApp(e.target.value)}
              >
                <option value="gpay">Google Pay</option>
                <option value="phonepe">PhonePe</option>
                <option value="paytm">Paytm</option>
              </select>
            </div>
          )}
        </div>

        {/* Pay Now Button */}
        <div className="mt-6 text-right">
          <p className="text-lg mb-2">Amount: ₹{order.amount}</p>
          <button
            onClick={handlePayNow}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Pay Now with {upiApp.toUpperCase()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
