import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";

import User from "../models/User.js";
import PendingUser from "../models/PendingUser.js";
import Otp from "../models/otp.js";

import { sendEmail } from "../services/email.service.js";

// ======================================================
// REGISTER & EMAIL VERIFICATION MODULE
// ======================================================

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // ======================
    // Validation
    // ======================

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // ======================
    // Existing User Check
    // ======================

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists.",
      });
    }

    // ======================
    // Delete Old Pending User
    // ======================

    await PendingUser.deleteOne({ email });

    // ======================
    // Generate OTP
    // ======================

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    console.log("Generated OTP:", otp);

    // ======================
    // Hash Password
    // ======================

    const hashedPassword = await bcrypt.hash(password, 10);

    // ======================
    // Save Pending User
    // ======================

    await PendingUser.create({
      name,
      email,
      password: hashedPassword,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    // ======================
    // Send OTP Email
    // ======================

    await sendEmail(
      email,
      "CodeNexus Email Verification",
      `Your OTP is: ${otp}

This OTP is valid for 5 minutes.

Do not share this OTP with anyone.`
    );

    // ======================
    // Success Response
    // ======================

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully. Please verify your email.",
      email,
    });

  } catch (error) {
    console.error("Register Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// ======================================================
// VERIFY OTP
// ======================================================

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // ======================
    // Validation
    // ======================

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required.",
      });
    }

    // ======================
    // Find Pending User
    // ======================

    const pendingUser = await PendingUser.findOne({ email });

    if (!pendingUser) {
      return res.status(404).json({
        success: false,
        message: "No pending registration found.",
      });
    }

    // ======================
    // OTP Expiry Check
    // ======================

    if (new Date() > pendingUser.expiresAt) {
      await PendingUser.deleteOne({ email });

      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please register again.",
      });
    }

    // ======================
    // OTP Verification
    // ======================

    if (pendingUser.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    // ======================
    // Create Verified User
    // ======================

    const user = await User.create({
      name: pendingUser.name,
      email: pendingUser.email,
      password: pendingUser.password,
      isVerified: true,
    });

    // ======================
    // Delete Pending User
    // ======================

    await PendingUser.deleteOne({ email });

    // ======================
    // Success Response
    // ======================

    return res.status(200).json({
      success: true,
      message: "Email verified successfully.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("Verify OTP Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ======================================================
// RESEND OTP
// ======================================================

export const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    // ======================
    // Validation
    // ======================

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    // ======================
    // Find Pending User
    // ======================

    const pendingUser = await PendingUser.findOne({ email });

    if (!pendingUser) {
      return res.status(404).json({
        success: false,
        message: "No pending registration found.",
      });
    }

    // ======================
    // Generate New OTP
    // ======================

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // ======================
    // Update Pending User
    // ======================

    pendingUser.otp = otp;
    pendingUser.expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await pendingUser.save();

    // ======================
    // Send Email
    // ======================

    await sendEmail(
      email,
      "CodeNexus Email Verification",
      `Your new OTP is: ${otp}

This OTP is valid for 5 minutes.

Do not share this OTP with anyone.`
    );

    // ======================
    // Success Response
    // ======================

    return res.status(200).json({
      success: true,
      message: "New OTP sent successfully.",
    });

  } catch (error) {
    console.error("Resend OTP Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// ======================================================
// LOGIN MODULE
// ======================================================

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ======================
    // Validation
    // ======================

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required.",
      });
    }

    // ======================
    // Find User
    // ======================

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email.",
      });
    }

    // ======================
    // Check Verification
    // ======================

    if (!user.isVerified) {
      return res.status(401).json({
        success: false,
        message: "Please verify your email first.",
      });
    }

    // ======================
    // Compare Password
    // ======================

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password.",
      });
    }

    // ======================
    // Generate JWT Token
    // ======================

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // ======================
    // Success Response
    // ======================

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ======================================================
// PASSWORD RECOVERY MODULE
// ======================================================

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // ======================
    // Validation
    // ======================

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    // ======================
    // Find User
    // ======================

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // ======================
    // Generate OTP
    // ======================

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // ======================
    // Remove Old OTP
    // ======================

    await Otp.deleteMany({ email });

    // ======================
    // Save OTP
    // ======================

    await Otp.create({
      email,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    // ======================
    // Send Email
    // ======================

    await sendEmail(
      email,
      "CodeNexus Password Reset OTP",
      `Your Password Reset OTP is: ${otp}

This OTP is valid for 5 minutes.

Do not share this OTP with anyone.`
    );

    // ======================
    // Success Response
    // ======================

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully.",
    });

  } catch (error) {
    console.error("Forgot Password Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // ======================
    // Validation
    // ======================

    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // ======================
    // Find OTP
    // ======================

    const otpRecord = await Otp.findOne({ email }).sort({
      createdAt: -1,
    });

    if (!otpRecord) {
      return res.status(404).json({
        success: false,
        message: "OTP not found.",
      });
    }

    // ======================
    // Expiry Check
    // ======================

    if (new Date() > otpRecord.expiresAt) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired.",
      });
    }

    // ======================
    // OTP Match
    // ======================

    if (otpRecord.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    // ======================
    // Hash Password
    // ======================

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // ======================
    // Update Password
    // ======================

    await User.findOneAndUpdate(
      { email },
      {
        password: hashedPassword,
      }
    );

    // ======================
    // Delete OTP
    // ======================

    await Otp.deleteMany({ email });

    // ======================
    // Success Response
    // ======================

    return res.status(200).json({
      success: true,
      message: "Password reset successful.",
    });

  } catch (error) {
    console.error("Reset Password Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};