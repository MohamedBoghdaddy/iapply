import express from "express";
import {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
  updateUserAndUploadResume,
} from "../controller/profileController.js";
import { auth, authorizeRoles } from "../Middleware/authMiddleware.js";

const router = express.Router();
router.post("/api/users/:userId/update-and-upload", updateUserAndUploadResume);

router.put(
  "/api/users/:userId/update-and-upload",
  auth,
  updateUserAndUploadResume
);
router.put("/user/:userId", auth, updateUserAndUploadResume);

router.post("/profile", auth, createProfile);
router.get("/profile/:userId", auth, getProfile);
router.put("/profile/:userId", auth, updateProfile);
router.delete("/profile/:userId", auth, deleteProfile);

export default router;
