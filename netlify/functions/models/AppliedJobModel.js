// netlify/functions/models/AppliedJobModel.js
import mongoose from "mongoose";

const appliedJobSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  jobId: {
    type: String,
    required: true,
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["applied", "interview", "offer", "rejected"],
    default: "applied",
  },
});

const AppliedJob = mongoose.model("AppliedJob", appliedJobSchema);

export default AppliedJob;
