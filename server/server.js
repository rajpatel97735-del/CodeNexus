import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/database.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect Database
    await connectDB();

    // Start Server
    app.listen(PORT, () => {
      console.log("==================================");
      console.log("🚀 CodeNexus Server Started");
      console.log(`🌐 URL  : http://localhost:${PORT}`);
      console.log(`📦 Mode : ${process.env.NODE_ENV || "development"}`);
      console.log("==================================");
    });

  } catch (error) {
    console.error("❌ Server Startup Failed");
    console.error(error);
    process.exit(1);
  }
};

startServer();

// Handle Unhandled Promise Rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  process.exit(1);
});

// Handle Uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});