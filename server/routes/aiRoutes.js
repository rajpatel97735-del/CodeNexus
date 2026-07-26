import express from "express";
import {
  generateWebsite,
  editWebsite,
  fixWebsite,
  explainWebsite,
  optimizeWebsite,
  visionWebsite,
  generateComponent,
  
} from "../controllers/aiController.js";
import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
});
const router = express.Router();
router.post("/component", generateComponent);
router.post("/optimize", optimizeWebsite);
router.post("/generate", generateWebsite);
router.post("/edit", editWebsite);
router.post("/fix", fixWebsite);
router.post("/explain", explainWebsite);
router.post(
  "/vision",
  upload.single("image"),
  visionWebsite
);

export default router;