// controllers/dashboardController.js
import Dashboard from "../models/DashboardModel.js";

// Create a new Dashboard
export const createDashboard = async (req, res) => {
  try {
    const { userId, ...dashboardData } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const dashboard = new Dashboard({ user: userId, ...dashboardData });
    await dashboard.save();
    res.status(201).json(dashboard);
  } catch (error) {
    console.error("Error creating dashboard:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get Dashboard for a specific user
export const getDashboard = async (req, res) => {
  try {
    const dashboard = await Dashboard.findOne({ user: req.params.userId });
    if (!dashboard) {
      return res.status(404).json({ message: "Dashboard not found" });
    }
    res.json(dashboard);
  } catch (error) {
    console.error("Error retrieving dashboard:", error);
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
    ).populate("user");
    if (!dashboard) {
      return res.status(404).json({ message: "Dashboard not found" });
    }
    res.json(dashboard);
  } catch (error) {
    console.error("Error updating dashboard:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// // Delete Dashboard for a specific user
// export const deleteDashboard = async (req, res) => {
//   try {
//     const dashboard = await Dashboard.findOneAndDelete({ user: req.params.userId });
//     if (!dashboard) {
//       return res.status(404).json({ message: "Dashboard not found" });
//     }
//     res.json({ message: "Dashboard deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };