import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import userRoutes from "./routes/userroutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import User from "./models/UserModel.js";
import DashboardRoutes from "./routes/DashboardRoutes.js";
import accountSettingsRoutes from "./routes/accountSettingRoutes.js";
import session from "express-session";
import connectMongoDBSession from "connect-mongodb-session";
import analyticRoutes from "./routes/analyticRoutes.js";
import axios from "axios";

dotenv.config();

const MongoDBStore = connectMongoDBSession(session);

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4000;
const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  console.error(
    "MongoDB connection string (MONGO_URL) is not defined in the environment variables."
  );
  process.exit(1);
}

mongoose.connect(MONGO_URL);

const store = new MongoDBStore({
  uri: MONGO_URL,
  collection: "sessions",
});

store.on("error", function (error) {
  console.error(error);
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

app.post("/api/user/profile", upload.single("cv"), async (req, res) => {
  const { countries, jobTitles } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.cv = req.file.path;
    user.countries = countries;
    user.jobTitles = jobTitles;
    await user.save();

    res.sendStatus(200);
  } catch (err) {
    console.error("Error saving user profile:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/AppliedJobRoutes", jobRoutes); // Updated to jobRoutes
app.use("/api/analytics", analyticRoutes);
app.use("/api/AccountSettings", accountSettingsRoutes);
app.use("/api/Dashboard", DashboardRoutes);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.post("/api/apply-jobs", async (req, res) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/apply-jobs",
      req.body
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error communicating with AI server:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export { app, razorpay };
