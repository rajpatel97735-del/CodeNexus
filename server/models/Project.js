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
      trim: true,
    },

    language: {
      type: String,
      enum: ["html", "javascript", "react"],
      default: "html",
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
          required: true,
        },

        message: {
          type: String,
          required: true,
          trim: true,
        },

        time: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    isStarred: {
      type: Boolean,
      default: false,
    },

    thumbnail: {
      type: String,
      default: "",
    },

    lastOpened: {
      type: Date,
      default: Date.now,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

const Project =
  mongoose.models.Project ||
  mongoose.model("Project", projectSchema);

export default Project;