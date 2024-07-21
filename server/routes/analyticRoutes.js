// routes/analyticsRoutes.js
import express from "express";
import {
  getJobApplicationAnalytics,
  getSubscriptionAnalytics,
} from "../controller/analyticsController.js";

const router = express.Router();

router.get("/job-application-analytics", getJobApplicationAnalytics); // Route to fetch job application analytics
router.get("/subscription-analytics",  getSubscriptionAnalytics); // Route to fetch subscription analytics

export default router;
