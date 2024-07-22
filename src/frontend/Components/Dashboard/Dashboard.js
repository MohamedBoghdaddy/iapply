// DashboardComponent.js
import React, { useEffect, useState } from "react";
import JobAppliedChart from "./JobAppliedChart";
import useDashboard from "../../../hooks/useDashboard";
import "../styles/Dashboard.css";

const DashboardComponent = () => {
  const { dashboard, fetchDashboard, updateDashboard, deleteDashboard } =
    useDashboard();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  useEffect(() => {
    if (dashboard && dashboard.analytics) {
      // Transform the analytics data into the format required by the chart
      const data = dashboard.analytics.jobsApplied || [];
      setChartData(data);
    }
  }, [dashboard]);

  // const handleUpdate = async () => {
  //   try {
  //     const updatedData = {
  //       /* your updated data */
  //     };
  //     await updateDashboard(updatedData);
  //   } catch (error) {
  //     console.error("Failed to update dashboard", error);
  //   }
  // };

  // const handleDelete = async () => {
  //   try {
  //     await deleteDashboard();
  //   } catch (error) {
  //     console.error("Failed to delete dashboard", error);
  //   }
  // };

  return (
    
      <div className="dashboard-container">
        <h1>Dashboard</h1>

        <div className="main-content">
          <div className="charts-section">
            <h3>Analytical Overview</h3>
            <JobAppliedChart data={chartData} />
          </div>
          {/* <button onClick={handleUpdate}>Update Dashboard</button>
          <button onClick={handleDelete}>Delete Dashboard</button> */}
        </div>
      </div>
  );
};

export default DashboardComponent;
