import express from "express";
import cors from "cors";
import projectRoutes from "./routes/projectRoutes.js";
import authRoutes from "./routes/authRoutes.js";


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("CodeNexus Backend Running 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

export default app;