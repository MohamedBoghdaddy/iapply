import express from "express";
import {
  createDashboard,
  getDashboard,
  updateDashboard,
  // deleteDashboard,
} from "../controller/dashboardController.js";
import { auth, authorizeRoles } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.use(auth);

router.post("/", authorizeRoles, createDashboard);
router.get("/:userId", getDashboard);
router.put("/:userId", auth, updateDashboard);
// router.delete("/:userId", deleteDashboard);

export default router;
