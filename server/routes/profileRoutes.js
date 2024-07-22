import express from "express";
import { updateUserAndUploadResume } from "../controller/profileController.js";
import { auth, authorizeRoles } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/update-user-and-upload-resume/:userId",
  updateUserAndUploadResume
);
router.put("/api/users/:userId/update-and-upload", updateUserAndUploadResume);

export default router;
