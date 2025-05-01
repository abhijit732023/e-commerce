import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { Product_model_2 } from '../../index.js';
import fs from 'fs';

const Product_route_2 = express.Router();

// Required to use `__dirname` with ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the upload folder exists
const uploadDir = path.join(__dirname, '..', '..', 'images');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Create the folder if it doesn't exist
}

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `abhi${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

// Routes
Product_route_2.post('/upload', upload.array('images', 5), async (req, res) => {
  // Log to check the request body and files
  console.log(req.body);
  console.log(req.files);

  const { name, price, description } = req.body;


  // Ensure images are uploaded and handled
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No images uploaded' });
  }

  // Get the URLs for the images
  const imageUrls = req.files.map(file => `${req.protocol}://${req.get('host')}/images/${file.filename}`);

  try {
    const product = new Product_model_2({ name, price, description, imageUrls });
    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (err) {
    res.status(500).json({ message: 'Error creating product', error: err });
  }
});

Product_route_2.get('/images', async (req, res) => {
  try {
    const products = await Product_model_2.find();
    
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err });
  }
});

export default Product_route_2;
