import axios from "axios";
import User from "../models/UserModel.js";
import AppliedJob from "../models/AppliedJobModel.js";
import { Subscription } from "../models/Subscription.js";

// Controller function to get user analytics
export const getUserAnalytics = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const totalApplications = await AppliedJob.countDocuments({ user: userId });
    const applicationsByStatus = await AppliedJob.aggregate([
      { $match: { user: userId } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const analytics = {
      totalApplications,
      applicationsByStatus,
    };

    res.status(200).json(analytics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to get job application analytics
export const getJobApplicationAnalytics = async (req, res) => {
  try {
    const userId = req.query.userId;

    const analyticsData = await AppliedJob.aggregate([
      { $match: { status: "completed", userId: userId } },
      { $group: { _id: "$userId", totalApplications: { $sum: 1 } } },
      { $sort: { totalApplications: -1 } },
    ]);

    res.status(200).json(analyticsData);
  } catch (error) {
    console.error("Failed to fetch job application analytics:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch job application analytics", error });
  }
};

// Controller function to get subscription analytics
export const getSubscriptionAnalytics = async (req, res) => {
  try {
    const authToken = req.headers.authorization;

    const analyticsData = await Subscription.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: "$category", totalSubscriptions: { $sum: 1 } } },
      { $sort: { totalSubscriptions: -1 } },
    ]);

    res.status(200).json(analyticsData);
  } catch (error) {
    console.error("Failed to fetch subscription analytics:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch subscription analytics", error });
  }
};

// Forward request to AI server to analyze CV
export const analyzeCv = async (req, res) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/analyze-cv",
      req.body
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error communicating with AI server:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Forward request to AI server to fetch jobs
export const fetchJobs = async (req, res) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/fetch-jobs",
      req.body
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error communicating with AI server:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Forward request to AI server to cluster jobs
export const clusterJobs = async (req, res) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/cluster-jobs",
      req.body
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error communicating with AI server:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Forward request to AI server to match profile to job
export const matchProfile = async (req, res) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/match-profile",
      req.body
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error communicating with AI server:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Forward request to AI server to apply to jobs
export const applyJobs = async (req, res) => {
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
};
