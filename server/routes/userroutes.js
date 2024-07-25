import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser,
  getCurrentUser,
  updateUserAndUploadResume,
} from "../controller/usercontroller.js";
import { auth, authorizeRoles } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/current", auth, getCurrentUser);
router.get("/:userId", auth, getUser);
router.put("/:userId", auth, updateUser);
router.put("/user/:userId/upload-resume", updateUserAndUploadResume);

export default router;
