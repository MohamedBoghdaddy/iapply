// controller/paymentController.js
import crypto from "crypto";

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
    res.status(200).json({ status: "success" });
  } else {
    res.status(400).json({ status: "failed" });
  }
};
// controller/paymentController.js
export const createOrder = async (req, res) => {
  const { amount, currency } = req.body;
  try {
    const options = {
      amount: amount * 100, // amount in the smallest currency unit
      currency: currency,
      receipt: 'receipt#1',
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
};
