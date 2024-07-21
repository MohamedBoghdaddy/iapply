import mongoose from "mongoose";

const dashboardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  data: { type: Object, required: true }, // You can customize the schema based on your dashboard needs
});

export default mongoose.model("Dashboard", dashboardSchema);
