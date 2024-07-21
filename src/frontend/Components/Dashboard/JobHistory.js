import React from "react";
import "../styles/Dashboard.css";

const JobHistory = () => {
  return (
    <div className="job-history">
      <h3>Job History</h3>
      <div className="filters">
        <input type="text" placeholder="Country" />
        <input type="text" placeholder="Job Title" />
        <input type="date" placeholder="From Date" />
        <input type="date" placeholder="To Date" />
        <button>Search</button>
        <button>Reset Filter</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Job Applied Date</th>
            <th>Company Name</th>
            <th>Job Title</th>
            <th>Location</th>
            <th>Job Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>17-Nov-2023</td>
            <td>HE Bergen</td>
            <td>HSE Advisor</td>
            <td>Nauru</td>
            <td>
              <a href="#view">VIEW</a>
            </td>
          </tr>
          <tr>
            <td>17-Nov-2023</td>
            <td>TEICON ENGINEERING</td>
            <td>HSE Manager</td>
            <td>France</td>
            <td>
              <a href="#view">VIEW</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default JobHistory;
