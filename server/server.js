import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import session from "express-session";
import connectMongoDBSession from "connect-mongodb-session";
import axios from "axios";
import cookieParser from "cookie-parser";
import { updateUserAndUploadResume } from "./controller/profileController.js";
import userroutes from "./routes/userroutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import accountSettingsRoutes from "./routes/accountSettingRoutes.js";
import analyticRoutes from "./routes/analyticRoutes.js";
import User from "./models/UserModel.js";
import { auth, authorizeRoles } from "./Middleware/authMiddleware.js";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
const upload = multer({ dest: "uploads/" });
const MongoDBStore = connectMongoDBSession(session);
const JWT_SECRET = process.env.JWT_SECRET;
const SESSION_SECRET = process.env.SESSION_SECRET;

const store = new MongoDBStore({
  uri: process.env.MONGO_URL,
  collection: "sessions",
});

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Configure session middleware
app.use(
  session({
    secret: SESSION_SECRET, // Ensure this is set
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
  })
);

// Environment variables
const PORT = process.env.PORT || 4000;
const MONGO_URL = process.env.MONGO_URL;
if (!MONGO_URL) {
  console.error(
    "MongoDB connection string (MONGO_URL) is not defined in the environment variables."
  );
  process.exit(1);
}

// Connect to MongoDB
mongoose
  .connect(MONGO_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((error) => console.error("Database connection error:", error));

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

// User profile upload route
app.post(
  "/api/users/profile",
  upload.single("cv"),
  auth,
  authorizeRoles("admin", "user"),
  updateUserAndUploadResume
);

// Routes
app.use("/api/users", userroutes);
app.use("/api/users/:userId", userroutes);
app.use("/api/users/:userId", profileRoutes);
app.use("/api/AppliedJobRoutes", jobRoutes); // Updated to jobRoutes
app.use("/api/analytics", analyticRoutes);
app.use("/api/AccountSettings", accountSettingsRoutes);
app.use("/api/users/:userId", updateUserAndUploadResume);
app.use("/api/jobs", jobRoutes);
app.use("/api/profiles", profileRoutes);

// Job application route
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
