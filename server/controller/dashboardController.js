// controllers/dashboardController.js
import Dashboard from "../models/DashboardModel.js";
import User from "../models/UserModel.js";

// Create a new Dashboard
export const createDashboard = async (req, res) => {
  try {
    const { userId, ...dashboardData } = req.body;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const dashboard = new Dashboard({ userId, ...dashboardData });
    await dashboard.save();
    res.status(201).json(dashboard);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get Dashboard for a specific user
export const getDashboard = async (req, res) => {
  try {
    const dashboard = await Dashboard.findOne({ userId: req.params.userId });
    if (!dashboard) {
      return res.status(404).json({ message: "Dashboard not found" });
    }
    res.json(dashboard);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update Dashboard for a specific user
export const updateDashboard = async (req, res) => {
  try {
    const dashboard = await Dashboard.findOneAndUpdate(
      { userId: req.params.userId },
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

// Delete Dashboard for a specific user
// export const deleteDashboard = async (req, res) => {
//   try {
//     const dashboard = await Dashboard.findOneAndDelete({
//       userId: req.params.userId,
//     });
//     if (!dashboard) {
//       return res.status(404).json({ message: "Dashboard not found" });
//     }
//     res.json({ message: "Dashboard deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };
