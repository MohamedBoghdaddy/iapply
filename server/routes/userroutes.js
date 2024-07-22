import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser,
  getCurrentUser,
} from "../controller/usercontroller.js";
import auth from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.get("/me", auth, getCurrentUser); // Secure route
router.get("/:userId", auth, getUser);
router.put("/:userId", auth, updateUser);

export default router;
