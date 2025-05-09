import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import config from '../../config/config.js';

const Payment_route = express.Router();

const razorpay = new Razorpay({
  key_id: config.payment_key_id,
  key_secret: config.payment_key_secret,
});

// 🔹 Create Razorpay Order
Payment_route.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || isNaN(amount)) {
      return res.status(400).json({ message: "Amount is required and must be a number" });
    }

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);
    res.status(201).json({ order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create Razorpay order" });
  }
});

// 🔹 Razorpay Webhook Verification
Payment_route.post("/webhook", express.raw({ type: "application/json" }), (req, res) => {
  const secret = config.payment_key_secret;

  const signature = req.headers["x-razorpay-signature"];
  const body = req.body;

  const generatedSignature = crypto
    .createHmac("sha256", secret)
    .update(JSON.stringify(body))
    .digest("hex");

  if (signature === generatedSignature) {
    console.log("✅ Signature verified successfully");
    // Save to DB here if needed
    return res.status(200).json({ status: "ok" });
  } else {
    console.warn("❌ Signature verification failed");
    return res.status(400).json({ status: "invalid signature" });
  }
});

export default Payment_route;
