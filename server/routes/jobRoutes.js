import express from "express";
import AppliedJob from "../models/AppliedJobModel.js"; // Adjust based on your project structure
import axios from "axios";

const router = express.Router();

// Forward request to AI server to analyze CV
router.post("/analyze-cv", async (req, res) => {
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
});

// Forward request to AI server to fetch jobs
router.post("/fetch-jobs", async (req, res) => {
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
});

// Forward request to AI server to cluster jobs
router.post("/cluster-jobs", async (req, res) => {
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
});

// Forward request to AI server to match profile to job
router.post("/match-profile", async (req, res) => {
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
});

// Forward request to AI server to apply to jobs
router.post("/apply-jobs", async (req, res) => {
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

// Endpoint to apply for jobs and save to database
router.post("/save-applied-jobs", async (req, res) => {
  const { userId, jobDetails } = req.body;

  try {
    const appliedJob = new AppliedJob({
      userId,
      companyName: jobDetails.companyName,
      jobTitle: jobDetails.jobTitle,
      location: jobDetails.location,
      jobDescription: jobDetails.jobDescription,
    });

    const savedJob = await appliedJob.save();
    res
      .status(200)
      .json({ message: "Job application successful", appliedJob: savedJob });
  } catch (error) {
    console.error("Error applying to jobs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Example route using AppliedJob
router.get("/", async (req, res) => {
  try {
    const jobs = await AppliedJob.find(); // Example usage of AppliedJob model
    res.json(jobs);
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
    res.status(500).json({ message: "Failed to fetch jobs", error });
  }
});

export default router;
