import mongoose from "mongoose";

const dashboardSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    analytics: {
      type: Object,
      default: {},
    },
    widgets: [
      {
        type: mongoose.Schema.Types.Mixed,
      },
    ],
  },
  { timestamps: true }
);

const Dashboard = mongoose.model("Dashboard", dashboardSchema);

export default Dashboard;
