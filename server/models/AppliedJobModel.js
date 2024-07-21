// AppliedJobModel.js

import mongoose from "mongoose";

const appliedJobSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const AppliedJob = mongoose.model("AppliedJob", appliedJobSchema);

export { AppliedJob };
