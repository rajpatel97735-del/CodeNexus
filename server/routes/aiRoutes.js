import express from "express";
import { generateCode } from "../controllers/aiController.js";

const router = express.Router();

router.post("/generate", (req, res, next) => {
  console.log("✅ AI Route Hit");
  next();
}, generateCode);

export default router;