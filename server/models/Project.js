import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    language: {
      type: String,
      enum: ["HTML", "JavaScript", "React"],
      default: "HTML",
    },

    html: {
      type: String,
      default: "",
    },

    css: {
      type: String,
      default: "",
    },

    javascript: {
      type: String,
      default: "",
    },
chatHistory: [
  {
    sender: {
      type: String,
      enum: ["user", "ai"],
    },

    message: {
      type: String,
      required: true,
    },

    time: {
      type: String,
      default: "",
    },
  },
],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Project", projectSchema);