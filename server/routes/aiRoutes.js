import express from "express";
import { generateWebsite } from "../controllers/aiController.js";

const router = express.Router();

router.post("/generate", generateWebsite);

export default router;