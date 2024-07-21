import express from "express";
import {
  getDashboard,
  createDashboard,
  updateDashboard,
} from "../controller/dashboardController.js";

const router = express.Router();

// Define your routes with proper parameterization
router.get("/:userId", getDashboard); // Route to get dashboard by userId
router.post("/", createDashboard); // Route to create dashboard
router.put("/:userId", updateDashboard); // Route to update dashboard by userId

export default router;
