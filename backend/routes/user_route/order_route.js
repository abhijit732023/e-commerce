import express from "express";
import {Order} from "../../index.js";

const Order_route = express.Router();

// Create a new order
Order_route.post("/add", async (req, res) => {
  const { userId, productId, header, description, images, size, quantity, buyingMehtod } = req.body;
  console.log(req.body);

  try {
    if (buyingMehtod === 'Wholesale') {
      // Check if a wholesale order with the same size exists
      const existingWholesaleOrder = await Order.findOne({ userId, productId, size, buyingMehtod: 'Wholesale' });

      if (existingWholesaleOrder) {
        // Update quantity of existing wholesale order
        existingWholesaleOrder.quantity += quantity;
        await existingWholesaleOrder.save();
        return res.status(200).json({ message: "Wholesale order quantity updated", order: existingWholesaleOrder });
      } else {
        // Create new wholesale order
        const newOrder = new Order(req.body);
        await newOrder.save();
        return res.status(201).json({ message: "Wholesale order created successfully", order: newOrder });
      }
    }

    // Check if order with same userId, productId and size exists for non-wholesale
    const existingOrder = await Order.findOne({ userId, productId, size });

    if (existingOrder) {
      // Update quantity of existing order
      existingOrder.quantity += quantity;
      await existingOrder.save();
      return res.status(200).json({ message: "Order quantity updated", order: existingOrder });
    } else {
      // Create new order
      const newOrder = new Order(req.body);
      await newOrder.save();
      return res.status(201).json({ message: "Order created successfully", order: newOrder });
    }
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

// Get order by ID
Order_route.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const order = await Order.find({userId:id});
    
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    return res.status(500).json({ message: "Server error" });
  }
});
Order_route.get("/single-item/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const order = await Order.find({_id:id});
    
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

import mongoose from "mongoose";

// Delete order by ID
Order_route.delete("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid order ID" });
  }
  try {
    const deletedOrder = await Order.findOneAndDelete({userId:req.params.id});
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

export default Order_route;
