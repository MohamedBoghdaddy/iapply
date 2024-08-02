import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser,
  deleteUser,
  checkAuth,
  auth,
  authorize,
} from "../controller/usercontroller.js";

const router = express.Router();

router.post("/signup", createUser);
router.post("/login",  loginUser);
// Route accessible only to admins
router.get("/admin", auth, authorize("admin"), (req, res) => {
  res.status(200).json({ message: "Welcome, Admin!" });
});
router.post("/logout", logoutUser);
router.get("/api/users/getone/:userId", getUser);

router.put("/update/:userId", auth, updateUser);
router.delete("/:userId", deleteUser);

// Route accessible to both admins and users
router.get('/dashboard', auth, authorizeRoles('admin', 'user'), (req, res) => {
  res.status(200).json({ message: 'Welcome to the Dashboard' });
});

// Add the checkAuth route
router.get("/checkAuth", checkAuth);

export default router;
