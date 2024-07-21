import AppliedJob from "../models/AppliedJob.js";

export const getJobs = async (req, res) => {
  try {
    const jobs = await AppliedJob.find({ userId: req.params.userId });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addJob = async (req, res) => {
  try {
    const job = new AppliedJob({ ...req.body, userId: req.params.userId });
    const savedJob = await job.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
