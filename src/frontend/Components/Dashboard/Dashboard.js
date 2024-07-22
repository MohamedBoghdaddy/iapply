import React, { useEffect } from "react";
import JobAppliedChart from "./JobAppliedChart"; // Ensure JobAppliedChart is imported if used
import { useAuthContext } from "../../../hooks/useAuthContext";
import useDashboard from "../../../hooks/useDashboard.js";

const Dashboard = () => {
  const { dashboard, fetchDashboard, updateDashboard, deleteDashboard } =
    useDashboard();

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const handleUpdate = async () => {
    try {
      const updatedData = {
        /* your updated data */
      };
      await updateDashboard(updatedData);
    } catch (error) {
      console.error("Failed to update dashboard", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDashboard();
    } catch (error) {
      console.error("Failed to delete dashboard", error);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      <div className="app-container">
        <div className="main-content">
          <div className="charts-section">
            <h3>Analytical Overview</h3>
            <JobAppliedChart />
          </div>
          <div className="actions-section">
            <button onClick={handleUpdate}>Update Dashboard</button>
            <button onClick={handleDelete}>Delete Dashboard</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
