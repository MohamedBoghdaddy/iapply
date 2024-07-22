import express from "express";
import {
  createDashboard,
  getDashboard,
  updateDashboard,
  // deleteDashboard,
} from "../controller/dashboardController.js";
import auth from "../Middleware/authMiddleware.js";

const router = express.Router();

router.use(auth);

router.post("/", createDashboard);
router.get("/:userId", getDashboard);
router.put("/:userId", updateDashboard);
// router.delete("/:userId", deleteDashboard);

export default router;
