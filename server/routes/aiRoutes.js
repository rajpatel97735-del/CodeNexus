import express from "express";
import {
  generateWebsite,
  editWebsite,
  fixWebsite,
} from "../controllers/aiController.js";

const router = express.Router();

router.post("/generate", generateWebsite);
router.post("/edit", editWebsite);
router.post("/fix", fixWebsite);

export default router;