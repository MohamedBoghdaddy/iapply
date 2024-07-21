import React, { useState } from "react";
import Sidebar from "./Sidebar";
import JobAppliedChart from "./JobAppliedChart"; // Ensure JobAppliedChart is imported if used
import { useAuthContext } from "../../../hooks/useAuthContext";

const Dashboard = () => {
  // Simulated authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [username, setUsername] = useState("Tommy Peter"); // Example username
const { user } = useAuthContext();


  

  return (
    <div className="app-container">
      {isLoggedIn && <Sidebar username={user} />}

      <div className="main-content">
        <div className="charts-section">
          <h3>Analytical Overview</h3>
          <JobAppliedChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
