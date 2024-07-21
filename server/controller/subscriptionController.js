// controllers/subscriptionController.js
import razorpay from "razorpay";
import { Subscription } from "../models/Subscription.js";
import { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } from "../config.js";

const instance = new razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

// Controller functions
const createSubscription = async (req, res) => {
  const { planId } = req.body;

  try {
    // Fetch plan details based on planId (e.g., $15 for 4000 job applications per month)
    const plan = fetchPlanDetails(planId); // Implement this function to fetch plan details from database or constants

    // Create Razorpay order
    const options = {
      amount: plan.amount, // amount in smallest currency unit (e.g., 1500 for $15)
      currency: "USD",
    };
    const order = await instance.orders.create(options);

    // Save subscription details in database
    const subscription = await Subscription.create({
      userId: req.user._id, // Assuming you have user details in req.user from authentication
      planId,
      orderId: order.id,
      status: "PENDING", // Set initial status
    });

    res.status(200).json(order);
  } catch (error) {
    console.error("Failed to create subscription:", error);
    res.status(500).json({ message: "Failed to create subscription", error });
  }
};

const getSubscriptionPlans = async (req, res) => {
  try {
    // Fetch and return available subscription plans
    const plans = fetchAvailablePlans(); // Implement this function to fetch plans from database or constants
    res.status(200).json(plans);
  } catch (error) {
    console.error("Failed to fetch subscription plans:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch subscription plans", error });
  }
};

const verifyPayment = async (req, res) => {
  const { orderId, paymentId, signature } = req.body;

  try {
    const payment = await instance.payments.fetch(paymentId);
    if (payment.status === "captured" && payment.order_id === orderId) {
      // Update subscription status to ACTIVE
      await Subscription.findOneAndUpdate({ orderId }, { status: "ACTIVE" });
      res.status(200).json({ message: "Payment verified successfully" });
    } else {
      res.status(400).json({ message: "Payment verification failed" });
    }
  } catch (error) {
    console.error("Payment verification failed:", error);
    res.status(500).json({ message: "Payment verification failed", error });
  }
};

export { createSubscription, getSubscriptionPlans, verifyPayment };
