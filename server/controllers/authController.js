import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import otpGenerator from "otp-generator";
import Otp from "../models/Otp.js";
import { sendEmail } from "../services/email.service.js";
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Existing User
    const existingUser = await User.findOne({ email });
    // Generate OTP
const otp = otpGenerator.generate(6, {
  upperCaseAlphabets: false,
  lowerCaseAlphabets: false,
  specialChars: false,
});
// Save OTP
await Otp.create({
  email,
  otp,
  expiresAt: new Date(Date.now() + 5 * 60 * 1000),
});

console.log("Generated OTP:", otp);

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Password Hash
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
const user = await User.create({
  name,
  email,
  password: hashedPassword,
  isVerified: false,
});
await sendEmail(
  email,
  "CodeNexus Email Verification",
  `Your OTP is ${otp}

This OTP will expire in 5 minutes.

Do not share this OTP with anyone.`
);

res.status(201).json({
  success: true,
  message: "Registration Successful",
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
  },
});

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const loginUser = async (req, res) => {
    console.log("LOGIN API HIT");
  try {
    const { email, password } = req.body;
console.log("Database:", User.db.name);
console.log("All Users:", await User.find());
    console.log("Email from request:", email);

    const user = await User.findOne({ email });

    console.log("User found:", user);

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email",
      });
    }
if (!user.isVerified) {
  return res.status(401).json({
    success: false,
    message: "Please verify your email before login.",
  });
}
   
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
  { id: user._id },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d",
  }
);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const otpRecord = await Otp.findOne({ email }).sort({ createdAt: -1 });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "OTP not found",
      });
    }

    if (new Date() > otpRecord.expiresAt) {
      const user = await User.findOne({ email });

if (!user) {
  return res.status(404).json({
    success: false,
    message: "User not found",
  });
}

user.isVerified = true;
await user.save();

// Delete all OTPs for this email
await Otp.deleteMany({ email });
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    if (otpRecord.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }
    const user = await User.findOne({ email });

if (!user) {
  return res.status(404).json({
    success: false,
    message: "User not found",
  });
}

user.isVerified = true;
await user.save();

await Otp.deleteMany({ email });

    return res.status(200).json({
      success: true,
      message: "OTP Verified Successfully",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Check Email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Generate OTP
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // Delete old OTP
    await Otp.deleteMany({ email });

    // Save new OTP
    await Otp.create({
      email,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    // Send Email
    await sendEmail(
      email,
      "CodeNexus Password Reset OTP",
      `Your Password Reset OTP is: ${otp}

This OTP is valid for 5 minutes.

Do not share this OTP with anyone.`
    );

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully.",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Find latest OTP
    const otpRecord = await Otp.findOne({ email }).sort({ createdAt: -1 });

    if (!otpRecord) {
      return res.status(404).json({
        success: false,
        message: "OTP not found",
      });
    }

    if (new Date() > otpRecord.expiresAt) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    if (otpRecord.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Hash New Password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update Password
    await User.findOneAndUpdate(
      { email },
      {
        password: hashedPassword,
      }
    );

    // Delete OTP
    await Otp.deleteMany({ email });

    return res.status(200).json({
      success: true,
      message: "Password reset successful",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};