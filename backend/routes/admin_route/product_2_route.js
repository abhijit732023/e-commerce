import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import {Product_model_2} from '../../index.js'
import fs from 'fs';

const Product_route_2 = express.Router();

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Image upload directory
const uploadDir = path.join(__dirname, '..', '..', 'images');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `abhi${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// ✅ POST /upload - Add new product with images
Product_route_2.post('/upload', upload.array('images', 5), async (req, res) => {
  console.log(req.body);
  
  try {
    const {
      header,
      brand,
      originalPrice,
      discountedPrice,
      category,
      color,
      quantity,
      availableSizes,
      tags,
      dateToDeliver,
      inStock,
      isFeatured,
      description,
    } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No images uploaded' });
    }

    const imageUrls = req.files.map(file => `${req.protocol}://${req.get('host')}/images/${file.filename}`);

    const newProduct = new Product_model_2({
      header,
      brand,
      originalPrice: parseFloat(originalPrice),
      discountedPrice: parseFloat(discountedPrice),
      category,
      color,
      quantity: parseInt(quantity),
      availableSizes: Array.isArray(availableSizes) ? availableSizes : availableSizes.split(','),
      tags: tags.split(',').map(tag => tag.trim()),
      dateToDeliver: new Date(dateToDeliver),
      inStock: inStock === 'true',
      isFeatured: isFeatured === 'true',
      description,
      images: imageUrls,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({ message: '✅ Product created successfully', product: savedProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '❌ Error creating product', error: err.message });
  }
});

// ✅ GET /products - Get all products
Product_route_2.get('/products', async (req, res) => {
  try {
    const products = await Product_model_2.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: '❌ Error fetching products', error: err.message });
  }
});

// ✅ GET /product/:id - Get product by ID
Product_route_2.get('/product/:id', async (req, res) => {
  try {
    const product = await Product_model_2.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ PUT /update/:id - Update product
Product_route_2.put('/update/:id', async (req, res) => {
  // console.log(req.body);
  console.log(req.params.id);
  
  
  try {
    const product = await Product_model_2.find(req.params.id);
    console.log('proo',product);
    
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Compare each field
    let isChanged = false;
    const fields = [
      "header", "description", "price", "fakePrie", "inStockStatus",
      "wholeSaleQuantity", "WholeSalePrice", "category", "dateToDeliver",
      "size", "tags", "color", "images", "discount"
    ];

    for (const field of fields) {
      // For arrays, compare as strings
      if (Array.isArray(product[field]) && Array.isArray(req.body[field])) {
        if (JSON.stringify(product[field]) !== JSON.stringify(req.body[field])) {
          isChanged = true;
          break;
        }
      } else if (
        (product[field] instanceof Date && new Date(product[field]).toISOString() !== new Date(req.body[field]).toISOString()) ||
        product[field] !== req.body[field]
      ) {
        isChanged = true;
        break;
      }
    }

    if (!isChanged) {
      return res.status(200).json({ message: "No changes detected", product });
    }

    // Update only if changed
    const updatedProduct = await Product_model_2.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.json({ message: "Product updated", product: updatedProduct });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ DELETE /delete/:id - Delete product
Product_route_2.delete('/delete/:id', async (req, res) => {
  try {
    const deletedProduct = await Product_model_2.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: '✅ Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default Product_route_2;
