import express from "express";
import { uploadResume } from "../controller/profileController.js";
import { auth, authorizeRoles } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/upload-resume", auth, uploadResume); // Route to upload resume

export default router;
