// Dashboard/components/ApplyToJobsComponent.js

import React, { useState } from "react";
import axios from "axios";

const ApplyToJobs = ({ userId, cvText, preferences }) => {
  const [response, setResponse] = useState(null);

  const handleApplyToJobs = async () => {
    try {
      const response = await axios.post("/api/apply-jobs", {
        userId,
        jobDetails: preferences, // Assuming preferences contain job details
      });
      setResponse(response.data.appliedJob);
    } catch (error) {
      console.error("Error applying to jobs:", error);
    }
  };

  return (
    <div>
      <button onClick={handleApplyToJobs}>Apply to Jobs</button>
      {response && (
        <div>
          <p>Job application successful!</p>
          <p>Company Name: {response.companyName}</p>
          <p>Job Title: {response.jobTitle}</p>
          <p>Location: {response.location}</p>
          <p>Job Description: {response.jobDescription}</p>
          <p>Applied Date: {new Date(response.appliedDate).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default ApplyToJobs;
