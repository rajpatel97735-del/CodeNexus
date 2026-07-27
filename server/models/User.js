import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // ======================
    // Basic Information
    // ======================

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    // ======================
    // Account Status
    // ======================

    isVerified: {
      type: Boolean,
      default: false,
    },

    // ======================
    // Profile
    // ======================

    avatar: {
      type: String,
      default: "",
    },

    // ======================
    // Authentication
    // ======================

    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

const User =
  mongoose.models.User ||
  mongoose.model("User", userSchema);

export default User;