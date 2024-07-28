import express from "express";
import mongoose from "mongoose";
import https from "https";
import fs from "fs";
import multer from "multer";
import cors from "cors";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import session from "express-session";
import connectMongoDBSession from "connect-mongodb-session";
import axios from "axios";
import cookieParser from "cookie-parser";
import userroutes from "./routes/userroutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import accountSettingsRoutes from "./routes/accountSettingRoutes.js";
import analyticRoutes from "./routes/analyticRoutes.js";
import User from "./models/UserModel.js";
import { auth, authorizeRoles } from "./Middleware/authMiddleware.js";
import jwt from "jsonwebtoken";
import employeeRoutes from "./routes/employeeRoutes.js"
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
app.use(cookieParser(SESSION_SECRET));

const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
app.use(cors(corsOptions));

const options = {
  key: fs.readFileSync("../localhost+1-key.pem"),
  cert: fs.readFileSync("../localhost+1.pem"),
};

// Configure session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Set to true in production
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
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
  .then(() => {
    https.createServer(options, app).listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
    process.exit(1);
  });

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

// Middleware to verify JWT tokens for protected routes
const verifyToken = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).json({ message: "Token is not valid" });
  }
};

app.post("api/users/login", (req, res) => {
  // Authenticate user and create a JWT token
  const token = createToken("userId", res); // Example userId
  res.json({ message: "Logged in", token });
});

const createToken = (_id, res) => {
  const token = jwt.sign({ _id }, JWT_SECRET, {
    expiresIn: "3d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Set to true in production
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
  });
  return token;
};

// Routes
app.use("/api/users", userroutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/analytics", analyticRoutes);
app.use("/api/AccountSettings", accountSettingsRoutes);

// Protecting routes
app.use("/api/protected-route", verifyToken, (req, res) => {
  res.json({ message: "This is a protected route" });
});

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
