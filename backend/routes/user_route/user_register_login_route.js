import express from "express";
import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser"; 
import jwt from "jsonwebtoken"; 
import nodemailer from "nodemailer";
import{user_register_model,config} from '../../index.js'
const Register_Login_Router = express.Router();

Register_Login_Router.use(cookieParser()); 


Register_Login_Router.post("/register", async (req, res) => {
  try {
    const { username, email, password,mobileNumber } = req.body;
    // console.log("Received registration data:", req.body); // Log the received data

    // Check if username already exists
    const usernameExist = await user_register_model.findOne({ username: username });
    if (usernameExist) {
      return res.status(401).json({ message: "Username already in use" });
    }

    // Check if email already exists
    const emailExist = await user_register_model.findOne({ email: email });
    if (emailExist) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash the password before storing it
    const saltRounds = 10; // Number of salt rounds for bcrypt
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user with hashed password
    const user = await user_register_model.create({
      username, // Ensure username is included
      email,
      mobileNumber,
      password: hashedPassword, // Store the hashed password
    });

    // console.log("User registered successfully:", user); // Log the successful registration
    res.status(201).json({ message: "User registered successfully", user: user });
  } catch (error) {
    console.error("Error registering user:", error.message); // Log any errors
    res.status(500).json({ error: error.message });
  }
});

Register_Login_Router.post("/login", async (req, res) => {
  try {
    const { identifier, password } = req.body;
    // console.log("Received data:", req.body);

    // Determine whether input is email or phone number
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
    const isPhone = /^[0-9]{10}$/.test(identifier);

    if (!isEmail && !isPhone) {
      return res.status(400).json({ message: "Invalid email or phone number format" });
    }

    // Find user by either email or mobile number
    const user = await user_register_model.findOne({
      $or: [
        { email: isEmail ? identifier : null },
        { mobileNumber: isPhone ? identifier : null }
      ]
    });

    // console.log(user);

    if (!user) {
      return res.status(401).json({ message: "Invalid email/phone or password" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    // console.log("Password match:", isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email/phone or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        username: user.username,
      },
      config.screteCode,
      { expiresIn: "7d" }
    );

    // Set cookie with token
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // true in production
      sameSite: "Lax",
    });

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});






export default Register_Login_Router;