import express from "express";
import { deployProject } from "../controllers/deploy.controller.js";

const router = express.Router();

router.post("/", deployProject);

export default router;