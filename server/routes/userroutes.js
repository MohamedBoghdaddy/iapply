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

router.get("/me", getCurrentUser); // Secure route
router.get("/:userId", getUser);
router.put("/:userId", updateUser);

export default router;
