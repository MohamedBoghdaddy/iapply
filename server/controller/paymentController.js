import crypto from "crypto";
import Razorpay from "razorpay"; // Make sure Razorpay SDK is installed and configured
import Payment from "../models/paymentModel.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const razorpayWebhook = (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = req.headers["x-razorpay-signature"];
  const body = req.body;

  const generatedSignature = crypto
    .createHmac("sha256", secret)
    .update(JSON.stringify(body))
    .digest("hex");

  if (generatedSignature === signature) {
    // Handle the webhook event
    const payment = new Payment({
      userId: body.payload.payment.entity.account_id, // Adjust based on actual webhook payload
      plan: body.payload.payment.entity.plan, // Adjust based on actual webhook payload
      planAmount: body.payload.payment.entity.amount / 100,
      discountAmount: 0, // Modify if discounts are used
      totalPayment: body.payload.payment.entity.amount / 100,
      paymentMethod: body.payload.payment.entity.method,
      paymentDate: new Date(),
      paymentStatus: body.payload.payment.entity.status,
      subscriptionStatus: "Active", // Modify as needed
      subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Example: 1 month later
      remainingDays: 30, // Example: 30 days
      razorpay_order_id: body.payload.payment.entity.order_id,
      razorpay_payment_id: body.payload.payment.entity.id,
      razorpay_signature: signature,
    });

    payment
      .save()
      .then(() => res.status(200).json({ status: "success" }))
      .catch((err) =>
        res.status(500).json({ status: "failed", error: err.message })
      );
  } else {
    res.status(400).json({ status: "failed" });
  }
};

export const createOrder = async (req, res) => {
  const { amount, currency } = req.body;
  try {
    const options = {
      amount: amount * 100, // amount in the smallest currency unit
      currency: currency,
      receipt: "receipt#1",
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create order", error: error.message });
  }
};
