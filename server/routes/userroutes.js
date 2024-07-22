import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser,
  getCurrentUser,
} from "../controller/usercontroller.js";
import { auth, authorizeRoles } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", createUser);
router.post("/login", loginUser);
router.post("/logout", auth, logoutUser);

router.get("/me", auth, authorizeRoles, getCurrentUser); // Secure route
router.get("/:userId", auth, authorizeRoles, getUser);
router.put("/:userId", auth, updateUser);

export default router;
