import express from "express";
import { uploadResume } from "../controller/profileController.js";

const router = express.Router();

router.post("/upload-resume", uploadResume); // Route to upload resume

export default router;
