import express from "express";
import { handleScanEvent } from "../controllers/scanController.js";

const router = express.Router();

router.post("/", handleScanEvent);

export default router;