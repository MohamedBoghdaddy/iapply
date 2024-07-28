import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controller/usercontroller.js";
import { auth, authorizeRoles } from "../Middleware/authMiddleware.js";

const router = express.Router();

// Apply authentication middleware to routes that need it
router.get("/user-id", auth, async (req, res) => {
  try {
    // Ensure req.user is set by auth middleware
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const userId = req.user._id; // Ensure the property matches your schema
    res.json({ userId });
  } catch (error) {
    console.error("Error fetching user ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.post("/signup", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/login", loginUser);
router.get("/api/users/getone/:userId", getUser);

router.post("/:userId", updateUser); // Example of role-based authorization
router.get("/getone/:userId", getUser); // Ensure auth middleware is used if needed
router.put("update/:userId", updateUser); // Example of role-based authorization
router.delete("/:userId", auth, deleteUser);

export default router;
