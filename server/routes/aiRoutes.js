import express from "express";
import {
  generateWebsite,
  editWebsite,
  fixWebsite,
  explainWebsite,
  optimizeWebsite,
} from "../controllers/aiController.js";

const router = express.Router();
router.post("/optimize", optimizeWebsite);
router.post("/generate", generateWebsite);
router.post("/edit", editWebsite);
router.post("/fix", fixWebsite);
router.post("/explain", explainWebsite);
export default router;