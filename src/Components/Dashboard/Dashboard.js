import React, { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get("/applications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplications(response.data);
    };

    fetchApplications();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {applications.map((application, index) => (
          <li key={index}>
            {application.job_title}: {application.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
