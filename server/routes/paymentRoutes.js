// // paymentRoutes.js
// import express from "express";
// import razorpay from "razorpay";
// import { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } from "../config.js";
// import {
//   createOrder,
//   checkout,
//   paymentVerification,
//   getPayments,
//   addPayment,
// } from "../controller/paymentController.js";
// import dotenv from "dotenv";

// dotenv.config();

// const router = express.Router();

// const instance = new razorpay({
//   key_id: RAZORPAY_KEY_ID,
//   key_secret: RAZORPAY_KEY_SECRET,
// });

// // Route to create a new payment order
// router.post("/create-order", async (req, res) => {
//   const options = {
//     amount: req.body.amount, // amount in smallest currency unit
//     currency: "INR",
//   };

//   try {
//     const order = await instance.orders.create(options);
//     res.status(200).json(order);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to create order", error });
//   }
// });

// // Route to handle payment checkout
// router.post("/checkout", checkout);

// // Route to verify payment
// router.post("/verification", paymentVerification);

// // Route to get payments by user ID
// router.get("/:userId", getPayments);

// // Route to add a payment for a user
// router.post("/:userId", addPayment);

// export default router;
