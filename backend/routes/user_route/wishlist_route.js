import express from "express";
import {Wishlist_model} from "../../index.js";
import mongoose from "mongoose";


const Wishlist_route = express.Router();

// Create a new order
Wishlist_route.post("/add", async (req, res) => {
  // const { productId, header, description, images, size, quantity } = req.body;
  console.log(req.body);
  

  try {
    const newOrder = new Wishlist_model(req.body);

    await newOrder.save();

    return res.status(201).json({ message: " Successfully added to Wishlist", order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Get all orders
// Wishlist_route.get("/", async (req, res) => {
//   try {
//     const orders = await Order.find();
//     return res.status(200).json(orders);
//   } catch (error) {
//     console.error("Error fetching orders:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// });

// Get order by ID
Wishlist_route.get("/:id", async (req, res) => {
  console.log('goo');
  
  const id = req.params.id;

  // try {
  //   const order = await Wishlist_model.find({userId:id});
    
  //   if (!order) {
  //     return res.status(404).json({ message: "Order not found" });
  //   }
  //   return res.status(200).json(order);
  // } catch (error) {
  //   console.error("Error fetching order:", error);
  //   return res.status(500).json({ message: "Server error" });
  // }
});

// // Update order by ID
// Wishlist_route.put("/:id", async (req, res) => {
//   const id = req.params.id;
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ message: "Invalid order ID" });
//   }
//   try {
//     const updatedOrder = await Wishlist_model.findByIdAndUpdate(id, req.body, { new: true });
//     if (!updatedOrder) {
//       return res.status(404).json({ message: "Order not found" });
//     }
//     return res.status(200).json({ message: "Order updated successfully", order: updatedOrder });
//   } catch (error) {
//     console.error("Error updating order:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// });


// // Delete order by ID
// Wishlist_route.delete("/:id", async (req, res) => {
//   const id = req.params.id;
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ message: "Invalid order ID" });
//   }
//   try {
//     const deletedOrder = await Wishlist_model.findOneAndDelete({userId:req.params.id});
//     if (!deletedOrder) {
//       return res.status(404).json({ message: "Order not found" });
//     }
//     return res.status(200).json({ message: "Order deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting order:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// });

export default Wishlist_route;
