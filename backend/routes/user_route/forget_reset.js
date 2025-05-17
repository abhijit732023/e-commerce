import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import {config,user_register_model} from'../../index.js'
//
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await user_register_model.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5m",
    });

    const link = `${config.frontendURL}/reset-password/${token}`;
    console.log('my_email',config.email_user);
    console.log('my_pass',config.email_password);
    

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.email_user,
        pass: config.email_password,
      },
    });
   
   
    await transporter.sendMail({
      from: config.email_user,
      to: user.email,
      subject: "Password Reset",
      html: `<p>Click <a href="${link}">here</a> to reset your password.</p>`,
    });

    res.json({ message: "Reset link sent to your email." });
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, config.screteCode);
    console.log('decoded',decoded);
    
    const hashedPassword = await bcrypt.hash(password, 10);
    await user_register_model.findByIdAndUpdate(decoded.userId, { password: hashedPassword });
    res.json({ message: "Password has been reset successfully." });
    console.log("Password reset successfully");
    
  } catch (err) {
    res.status(400).json({ message: "Invalid or expired token." });
  }
};
