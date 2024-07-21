// import { instance } from "../index.js"; // Import Razorpay instance
// import crypto from "crypto";
// import { Payment } from "../models/paymentModel.js";

// export const getPayments = async (req, res) => {
//   try {
//     const payments = await Payment.find({ userId: req.params.userId });
//     res.json(payments);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// export const checkout = async (req, res) => {
//   const { amount } = req.body;

//   const options = {
//     amount: Number(amount * 100), // Amount in smallest currency unit (in paisa for INR)
//     currency: "INR",
//   };

//   try {
//     const order = await instance.orders.create(options);

//     res.status(200).json({
//       success: true,
//       order,
//     });
//   } catch (error) {
//     console.error("Razorpay checkout error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Razorpay checkout failed",
//       error: error.message,
//     });
//   }
// };

// export const paymentVerification = async (req, res) => {
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//     req.body;

//   const body = razorpay_order_id + "|" + razorpay_payment_id;

//   const expectedSignature = crypto
//     .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
//     .update(body)
//     .digest("hex");

//   if (expectedSignature === razorpay_signature) {
//     try {
//       await Payment.create({
//         razorpay_order_id,
//         razorpay_payment_id,
//         razorpay_signature,
//       });

//       res.redirect(
//         `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
//       );
//     } catch (error) {
//       console.error("Payment save error:", error);
//       res.status(500).json({
//         success: false,
//         message: "Payment save failed",
//         error: error.message,
//       });
//     }
//   } else {
//     res.status(400).json({
//       success: false,
//       message: "Payment verification failed",
//     });
//   }
// };


// export const addPayment = async (req, res) => {
//   try {
//     const payment = new Payment({ ...req.body, userId: req.params.userId });
//     const savedPayment = await payment.save();
//     res.status(201).json(savedPayment);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };