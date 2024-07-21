import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser,
  getDashboard,
} from "../controller/usercontroller.js";

const router = express.Router();

// Define routes with userId as a parameter
router.post("/signup", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// Use parameterized routes for dynamic userId
router.get("/:userId", getUser); // Get user by userId
router.put("/:userId", updateUser); // Update user by userId

// Dashboard routes might be handled separately
router.get("/dashboard/:userId", getDashboard); // Get dashboard by userId

export default router;
