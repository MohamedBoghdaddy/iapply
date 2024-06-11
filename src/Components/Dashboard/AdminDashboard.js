import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const userResponse = await axios.get("/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(userResponse.data);

      const jobResponse = await axios.get("/admin/jobs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(jobResponse.data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div>
        <h2>Users</h2>
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              {user.email}: {user.role}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Jobs</h2>
        <ul>
          {jobs.map((job, index) => (
            <li key={index}>
              {job.title}: {job.company}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminDashboard;
