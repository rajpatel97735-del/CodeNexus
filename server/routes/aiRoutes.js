import express from "express";
import { generateCode } from "../controllers/aiController.js";

const router = express.Router();

// Generate AI Code
router.post("/generate", generateCode);

export default router;