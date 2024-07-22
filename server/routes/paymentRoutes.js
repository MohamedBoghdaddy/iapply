// routes/paymentRoutes.js
import express from "express";
import { razorpayWebhook } from "../controller/paymentController.js";

const router = express.Router();

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  razorpayWebhook
);

export default router;
