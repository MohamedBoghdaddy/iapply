// models/Subscription.js
import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  planId: { type: String, required: true },
  orderId: { type: String, required: true },
  status: {
    type: String,
    enum: ["PENDING", "ACTIVE", "CANCELLED"],
    default: "PENDING",
  },
  createdAt: { type: Date, default: Date.now },
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export { Subscription };
