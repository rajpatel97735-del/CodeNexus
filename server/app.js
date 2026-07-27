import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import deployRoutes from "./routes/deploy.routes.js";

const app = express();

// ======================================
// Middlewares
// ======================================
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ======================================
// Health Check
// ======================================
app.get("/", (req, res) => {
  res.status(200).send("🚀 CodeNexus Backend Running...");
});

// ======================================
// API Routes
// ======================================
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/deploy", deployRoutes);

// ======================================
// 404 Route
// ======================================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ======================================
// Global Error Handler
// ======================================
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;