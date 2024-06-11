import React, { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [analytics, setAnalytics] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get("/analytics", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnalytics(response.data);
    };

    fetchAnalytics();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {analytics.map((application, index) => (
          <li key={index}>
            {application.job_title}: {application.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
