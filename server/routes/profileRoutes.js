import express from "express";
import { updateUserAndUploadResume } from "../controller/profileController.js";
import { auth, authorizeRoles } from "../Middleware/authMiddleware.js";

const router = express.Router();
router.post("/api/users/:userId/update-and-upload", updateUserAndUploadResume);

router.put(
  "/api/users/:userId/update-and-upload",
  auth,
  updateUserAndUploadResume
);

export default router;
