import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import{ product_add_model,config} from "../../index.js";

const router = express.Router();

// Setup __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure images directory exists
const imageStoragePath = path.join(__dirname, "../../images");
if (!fs.existsSync(imageStoragePath)) {
  fs.mkdirSync(imageStoragePath, { recursive: true });
}

// Configure Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imageStoragePath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
<<<<<<< HEAD
const upload = multer({ storage,
limits: {
    fileSize: 50 * 1024 * 1024, }
=======
const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50 MB per file
  }
>>>>>>> a7f4610351c00484cfca041bcc10c72cee0253e5
});

/*----------------- CREATE PRODUCT ------------------*/
router.post("/add", upload.array("images", 5), async (req, res) => {
  console.log('products',req.body);
  
  try {
    const {
      header,
      description,
      price,
      fakePrie,
      inStockStatus,
      wholeSaleQuantity,
      WholeSalePrice,
      category,
      dateToDeliver,
      size,
      tags,
      color,
    } = req.body;

    const imagePaths = req.files.map(file => `/images/` + file.filename);
    console.log('imagespaths',imagePaths);
    

    const newProduct = new product_add_model({
      header,
      description,
      price,
      fakePrie,
      inStockStatus,
      wholeSaleQuantity,
      WholeSalePrice,
      category,
      dateToDeliver,
      size: Array.isArray(size) ? size : [size],
      tags: Array.isArray(tags) ? tags : tags?.split(","),
      color,
      images: imagePaths,
    });

    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Product creation error:", err);
    res.status(500).json({ message: "Product creation failed", err });
  }
});

/*----------------- GET ALL PRODUCTS ------------------*/
router.get("/", async (req, res) => {
  try {
    const products = await product_add_model.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products", err });
  }
});

/*----------------- GET SINGLE PRODUCT ------------------*/
router.get("/:id", async (req, res) => {
  try {
    const product = await product_add_model.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Error fetching product", err });
  }
});

/*----------------- UPDATE PRODUCT ------------------*/
router.put("/update/:id", upload.array("images", 5), async (req, res) => {
  try {
    const {
      header,
      description,
      price,
      fakePrie,
      inStockStatus,
      wholeSaleQuantity,
      WholeSalePrice,
      category,
      dateToDeliver,
      size,
      tags,
      color,
    } = req.body;

    const product = await product_add_model.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // If new images are uploaded, delete old images
    if (req.files && req.files.length > 0) {
      product.images.forEach(img => {
        const localPath = path.join(__dirname, "../../", img);
        if (fs.existsSync(localPath)) fs.unlinkSync(localPath);
      });
    }

    const imagePaths = req.files.map(file => "/images/" + file.filename);

    product.header = header;
    product.description = description;
    product.price = price;
    product.fakePrie = fakePrie;
    product.inStockStatus = inStockStatus;
    product.wholeSaleQuantity = wholeSaleQuantity;
    product.WholeSalePrice = WholeSalePrice;
    product.category = category;
    product.dateToDeliver = dateToDeliver;
    product.size = Array.isArray(size) ? size : [size];
    product.tags = Array.isArray(tags) ? tags : tags?.split(",");
    product.color = color;
    if (imagePaths.length > 0) product.images = imagePaths;

    const updated = await product.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update product", err });
  }
});

/*----------------- DELETE PRODUCT ------------------*/
router.delete("/delete/:id", async (req, res) => {
  try {
    const product = await product_add_model.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Delete images from local storage
    product.images.forEach(img => {
      const localPath = path.join(__dirname, "../../", img);
      if (fs.existsSync(localPath)) fs.unlinkSync(localPath);
    });

    await product.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting product", err });
  }
});

export default router;
