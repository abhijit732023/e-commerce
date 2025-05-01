import express from 'express'
const Product_add_route = express.Router();
import {product_add_model} from '../../index.js'
// @desc   Create a new product
// @route  POST /api/products
Product_add_route.post('/create', async (req, res) => {
  try {
    const product = new product_add_model(req.body);
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Mongoose Save Error:', err); // Add this line
    if (err.name === 'MongoServerError' && err.code === 11000) {
      return res.status(400).json({ message: 'SKU already exists' });
    }
    res.status(400).json({ message: err.message });
  }
});


// @desc   Get all products
// @route  GET /api/products
Product_add_route.get('/product/detail', async (req, res) => {
  try {
    const products = await product_add_model.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @desc   Get a single product by ID
// @route  GET /api/products/:id
Product_add_route.get('/product/:id', async (req, res) => {
  try {
    const product = await product_add_model.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @desc   Update a product by ID
// @route  PUT /api/products/:id
Product_add_route.put('/update/:id', async (req, res) => {
  try {
    const updated = await product_add_model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: 'Product not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @desc   Delete a product by ID
// @route  DELETE /api/products/:id
Product_add_route.delete('/delete/:id', async (req, res) => {
  try {
    const deleted = await product_add_model.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default Product_add_route