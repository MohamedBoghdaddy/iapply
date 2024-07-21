// // paymentModel.js
// import mongoose from "mongoose";

// const { Schema } = mongoose;

// const paymentSchema = new Schema(
//   {
//     userId: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     plan: { type: String, required: true },
//     planAmount: { type: Number, required: true },
//     discountAmount: { type: Number, default: 0 },
//     totalPayment: { type: Number, required: true },
//     paymentMethod: { type: String, required: true },
//     paymentDate: { type: Date, default: Date.now },
//     paymentStatus: { type: String, required: true },
//     subscriptionStatus: { type: String, required: true },
//     subscriptionEndDate: { type: Date, required: true },
//     remainingDays: { type: Number, required: true },
//     razorpay_order_id: { type: String, required: true },
//     razorpay_payment_id: { type: String, required: true },
//     razorpay_signature: { type: String, required: true },
//   },
//   { timestamps: true }
// );

// const Payment = mongoose.model("Payment", paymentSchema);

// export default Payment;
