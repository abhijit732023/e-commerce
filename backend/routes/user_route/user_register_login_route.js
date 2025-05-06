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
    const { username, email, password } = req.body;
    console.log("Received registration data:", req.body); // Log the received data

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
      password: hashedPassword, // Store the hashed password
    });

    console.log("User registered successfully:", user); // Log the successful registration
    res.status(201).json({ message: "User registered successfully", user: user });
  } catch (error) {
    console.error("Error registering user:", error.message); // Log any errors
    res.status(500).json({ error: error.message });
  }
});

Register_Login_Router.post("/login", async (req, res) => { 
    try {
      const { email, password } = req.body; 
      console.log("Received data:", req.body); 
  
      // Find a user by email
      const user = await user_register_model.findOne({ email: email }); 
      console.log(user); 
      
      if (!user) { 
        return res.status(401).json({ message: "Invalid email or password" }); 
      }
  
      // Compare the entered password with the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password); 
      console.log("Password match:", isPasswordValid); 
      
      if (!isPasswordValid) { 
        return res.status(401).json({ message: "Invalid email or password" }); 
      }
  
      // Generate a JWT token
      const token = jwt.sign({ userId: user._id, email: user.email, username: user.username }, config.screteCode, { expiresIn: '7d' }); 
      // Set a cookie with the token
      res.cookie('token', token, {
        httpOnly: true,
        secure: true,  // Ensure cookie is only sent over HTTPS in production
        sameSite: 'Lax'  // Adjust as needed
      });
      
  
      res.status(200).json({ message: "Login successful", user }); 
    } catch (error) { 
      console.error("Login error:", error.message); 
      res.status(500).json({ error: error.message || "Internal Server Error" }); 
    }
  });

  Register_Login_Router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;
    console.log(email);
    
  
    try {
      const user = await user_register_model.findOne({ email:email });
      console.log(user);
      
      if (!user) {
        return res.status(404).json({ message: "User not found with this email" });
      }
  
      // Create a JWT token valid for 1 hour
      const token = jwt.sign({ userId: user._id }, config.screteCode, { expiresIn: "1h" });
      console.log(token);
      
  
      const resetLink = `http://localhost:5173/reset-password/${token}`; // Frontend reset-password page
  
      // Send email
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: config.email_user, // Gmail address
          pass: config.email_password, // Gmail app password
        },
      });
  
      await transporter.sendMail({
        from: config.email_user,
        to: email,
        subject: "Password Reset - SS Collection",
        html: `
          <h2>Password Reset Request</h2>
          <p>Click the link below to reset your password:</p>
          <a href="${resetLink}">${resetLink}</a>
          <p>This link is valid for 1 hour.</p>
        `,
      });
  
      res.status(200).json({ message: "Password reset link sent to your email" });
    } catch (error) {
      console.error("Error sending reset link:", error.message);
      res.status(500).json({ message: "Error sending reset link. Try again." });
    }
  });
  Register_Login_Router.post("/reset-password", async (req, res) => {
    try {
      const { token, password } = req.body;
  
      const user = await user_register_model.findOne({
        resetToken: token,
        tokenExpiry: { $gt: Date.now() },
      });
  
      if (!user) {
        return res.status(400).json({ message: "Invalid or expired token" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      user.password = hashedPassword;
      user.resetToken = undefined;
      user.tokenExpiry = undefined;
      await user.save();
  
      res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
      console.error("Reset Password Error:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  



export default Register_Login_Router;