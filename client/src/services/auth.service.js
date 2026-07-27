import API from "./api";

// ======================================================
// REGISTER & EMAIL VERIFICATION
// ======================================================

export const registerUser = (data) =>
  API.post("/auth/register", data);

export const verifyOTP = (data) =>
  API.post("/auth/verify-otp", data);

export const resendOTP = (email) =>
  API.post("/auth/resend-otp", { email });

// ======================================================
// AUTHENTICATION
// ======================================================

export const loginUser = (data) =>
  API.post("/auth/login", data);

// export const getProfile = () =>
//   API.get("/auth/profile");

// ======================================================
// PASSWORD RECOVERY
// ======================================================

export const forgotPassword = (email) =>
  API.post("/auth/forgot-password", { email });

export const resetPassword = (data) =>
  API.post("/auth/reset-password", data);