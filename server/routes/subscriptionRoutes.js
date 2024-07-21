// routes/subscriptionRoutes.js
import express from "express";
import {
  createSubscription,
  getSubscriptionPlans,
  verifyPayment,
} from "../controller/subscriptionController.js";

const router = express.Router();

router.post("/create-subscription", createSubscription); // Route to create a new subscription
router.get("/subscription-plans", getSubscriptionPlans); // Route to fetch available subscription plans
router.post("/verify-payment", verifyPayment); // Route to verify payment status

export default router;
