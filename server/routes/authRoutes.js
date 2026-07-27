import express from "express";

import {
  // ==============================
  // Register & Email Verification
  // ==============================
  registerUser,
  verifyOTP,
  resendOTP,

  // ==============================
  // Authentication
  // ==============================
  loginUser,

  // ==============================
  // Password Recovery
  // ==============================
  forgotPassword,
  resetPassword,

} from "../controllers/authController.js";

const router = express.Router();

// ======================================================
// REGISTER & EMAIL VERIFICATION ROUTES
// ======================================================

router.post("/register", registerUser);
router.post("/verify-otp", verifyOTP);
router.post("/resend-otp", resendOTP);

// ======================================================
// AUTHENTICATION ROUTES
// ======================================================

router.post("/login", loginUser);

// ======================================================
// PASSWORD RECOVERY ROUTES
// ======================================================

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;