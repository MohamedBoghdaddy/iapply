// controllers/dashboardController.js

import Dashboard from "../models/DashboardModel.js";

// Get Dashboard for a specific user
export const getDashboard = async (req, res) => {
  try {
    const dashboard = await Dashboard.findOne({ user: req.params.userId });
    if (!dashboard) {
      return res.status(404).json({ message: "Dashboard not found" });
    }
    res.json(dashboard);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Create a new Dashboard
export const createDashboard = async (req, res) => {
  try {
    const { userId, ...dashboardData } = req.body;
    const dashboard = new Dashboard({ user: userId, ...dashboardData });
    await dashboard.save();
    res.status(201).json(dashboard);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update Dashboard for a specific user
export const updateDashboard = async (req, res) => {
  try {
    const dashboard = await Dashboard.findOneAndUpdate(
      { user: req.params.userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!dashboard) {
      return res.status(404).json({ message: "Dashboard not found" });
    }
    res.json(dashboard);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
