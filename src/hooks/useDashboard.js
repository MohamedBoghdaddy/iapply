import { useContext } from "react";
import { DashboardContext } from "../context/DashboardContext";
import axios from "axios";

const useDashboard = () => {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }

  const { dashboard, fetchDashboard, updateDashboard } = context;

  const updateUser = async (userId, userData) => {
    try {
      const response = await axios.put(`/api/users/${userId}`, userData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you store token in localStorage
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };

  return {
    dashboard,
    fetchDashboard,
    updateDashboard,
    updateUser,
  };
};

export default useDashboard;
