import express from "express";
import mongoose from "mongoose";
import { Order } from "../../index.js";

const Order_route = express.Router();

// Add new order
Order_route.post("/add", async (req, res) => {
  try {
    const {
      userId,
      productId,
      header,
      description,
      images,
      size,
      quantity,
      buyingMehtod,
      price,
      addressId,
      paymentStatus, // <-- NEW
      cancelOrder,   // <-- NEW
      cancelReason,  // <-- NEW
    } = req.body;

    // Validate required fields
    if (!userId || !productId || !size || !quantity) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    let order;

    if (buyingMehtod === "Wholesale") {
      // Only update wholesale orders
      order = await Order.findOne({
        userId,
        productId,
        size,
        buyingMehtod: "Wholesale",
      });

      if (order) {
        order.quantity += quantity;
        await order.save();
        return res.status(200).json({ message: "Wholesale order quantity updated", order });
      }

      // Create new wholesale order
      order = new Order({
        userId,
        productId,
        header,
        description,
        images,
        size,
        quantity,
        buyingMehtod: "Wholesale",
        price,
        addressId,
        paymentStatus: paymentStatus || "pending",
        cancelOrder: cancelOrder || "no",
        cancelReason: cancelReason || "default",
      });
      await order.save();
      return res.status(201).json({ message: "Wholesale order created successfully", order });
    }

    // For non-wholesale, do NOT update wholesale orders
    order = await Order.findOne({
      userId,
      productId,
      size,
      $or: [
        { buyingMehtod: { $exists: false } },
        { buyingMehtod: { $ne: "Wholesale" } },
      ],
      paymentStatus: { $ne: "paid" }, // Only find unpaid orders
    });

    if (order) {
      order.quantity += quantity;
      await order.save();
      return res.status(200).json({ message: "Order quantity updated", order });
    }

    // Create new non-wholesale order
    order = new Order({
      userId,
      productId,
      header,
      description,
      images,
      size,
      quantity,
      buyingMehtod: buyingMehtod || "Retail",
      price,
      addressId,
      paymentStatus: paymentStatus || "pending",
      cancelOrder: cancelOrder || "no",
      cancelReason: cancelReason || "default",
    });
    await order.save();
    return res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Get all orders
Order_route.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Get order by user ID
Order_route.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const order = await Order.find({ userId: id });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Get single order by order ID
Order_route.get("/single-item/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const order = await Order.find({ _id: id });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Update order by ID
Order_route.put("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid order ID" });
  }
  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json({ message: "Order updated successfully", order: updatedOrder });
  } catch (error) {
    console.error("Error updating order:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Cancel order (update cancelOrder and cancelReason)
Order_route.post("/cancel", async (req, res) => {
  const { orderId, reason } = req.body;
  if (!orderId || !reason) {
    return res.status(400).json({ message: "Order ID and reason are required" });
  }
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { cancelOrder: "yes", cancelReason: reason, paymentStatus: "cancelled" },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json({ message: "Order cancelled successfully", order: updatedOrder });
  } catch (error) {
    console.error("Error cancelling order:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Delete order by ID
Order_route.delete("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid order ID" });
  }
  try {
    const deletedOrder = await Order.findOneAndDelete({ userId: req.params.id });
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Cancel order (update cancelOrder and cancelReason)
Order_route.post("/cancel", async (req, res) => {
  const { orderId, reason } = req.body;
  if (!orderId || !reason) {
    return res.status(400).json({ message: "Order ID and reason are required" });
  }
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { cancelOrder: "yes", cancelReason: reason, paymentStatus: "cancelled" },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json({ message: "Order cancelled successfully", order: updatedOrder });
  } catch (error) {
    console.error("Error cancelling order:", error);
    return res.status(500).json({ message: "Server error" });
  }
});


export default Order_route;