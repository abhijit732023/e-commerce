import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import {
  Address_route,
  Wishlist_route,
  Payment_route,
  Order_route,
  Product_route_2,
  Product_add_route,
  config,
  Register_Login_Router,
  forgotPassword,
  resetPassword,
  Review
} from "../backend/index.js";
import path, { join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ✅ Serve static images
app.use('/images', express.static(path.join(__dirname, 'images')));

// CORS
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "https://e-commerce-lake-gamma-54.vercel.app",
        "https://e-commerce-j60o8juz0-abhijit732023s-projects.vercel.app",
        "https://e-commerce-git-main-abhijit732023s-projects.vercel.app",
        "http://localhost:5173",
        "http://192.168.182.23:5173",
      ];
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



// Routes
app.use("/", Register_Login_Router);
app.use("/admin", Product_add_route);
app.use("/add", Product_route_2);
app.use("/order", Order_route);
app.use("/payment", Payment_route);
app.use("/wishlist", Wishlist_route);
app.use("/address", Address_route);
app.use("/reset-password/:token", resetPassword);
app.use("/forgot-password", forgotPassword);
app.use("/review", Review);

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// DB connection
mongoose
  .connect(config.mongoURL)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const PORT = config.port || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));