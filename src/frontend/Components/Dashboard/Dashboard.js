// DashboardComponent.js
import React, { useEffect, useState } from "react";
import JobAppliedChart from "./JobAppliedChart";
import useDashboard from "../../../hooks/useDashboard";
import "../styles/Dashboard.css";

const DashboardComponent = () => {
  const { jobData } = useDashboard(); // Replace with your actual data fetching logic

  const [chartData, setChartData] = useState([]);

  
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
    <div className="page-content">
      <h1>Dashboard</h1>
      <div className="job-applied-chart">
        {jobData ? (
          <JobAppliedChart jobData={jobData} />
        ) : (
          <p>Loading chart...</p>
        )}
      </div>
    </div>
  );
};

export default DashboardComponent;
