import React, { useEffect, useState } from "react";
import JobAppliedChart from "./JobAppliedChart";
import useDashboard from "../../../hooks/useDashboard";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const { jobData } = useDashboard(); // Replace with your actual data fetching logic

  const [chartData, setChartData] = useState([]);

  // Ensure jobData is an object or array and not a function
  useEffect(() => {
    if (jobData && Array.isArray(jobData)) {
      setChartData(jobData);
    }
  }, [jobData]);

  return (
    <div className="page-content">
      <h1>Dashboard</h1>
      <div className="job-applied-chart">
        {chartData.length > 0 && <JobAppliedChart jobData={chartData} />}
      </div>
    </div>
  );
};

export default Dashboard;
