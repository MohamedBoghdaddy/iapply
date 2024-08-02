import express from "express";
import AppliedJob from "../models/AppliedJobModel.js"; // Adjust based on your project structure

const router = express.Router();

// Endpoint to apply for jobs and save to database
router.post("/apply-jobs", async (req, res) => {
  const { userId, jobDetails } = req.body;

  try {
    // Create a new instance of AppliedJob model
    const appliedJob = new AppliedJob({
      userId,
      companyName: jobDetails.companyName,
      jobTitle: jobDetails.jobTitle,
      location: jobDetails.location,
      jobDescription: jobDetails.jobDescription,
    });

    // Save applied job to database
    const savedJob = await appliedJob.save();

    // Respond with success message or applied job details
    res
      .status(200)
      .json({ message: "Job application successful", appliedJob: savedJob });
  } catch (error) {
    console.error("Error applying to jobs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Example route using AppliedJob
router.get("/jobs", async (req, res) => {
  try {
    const jobs = await AppliedJob.find(); // Example usage of AppliedJob model
    res.json(jobs);
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
    res.status(500).json({ message: "Failed to fetch jobs", error });
  }
});

export default router;
