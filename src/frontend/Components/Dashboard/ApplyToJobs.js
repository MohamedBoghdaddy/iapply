import React, { useState } from "react";
import axios from "axios";
import "../styles/ApplyToJobs.css"; // Import the CSS file

const ApplyToJobs = ({ userId, cvText, preferences }) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleApplyToJobs = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        "http://localhost:4000/api/AppliedJobRoutes/job",
        {
          userId,
          cvText, // Sending CV text to the backend
          jobDetails: preferences,
        }
      );
      setResponse(result.data.appliedJob);
    } catch (error) {
      console.error("Error applying to jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="apply-to-jobs-container">
      <button
        className="apply-button"
        onClick={handleApplyToJobs}
        disabled={loading}
      >
        {loading ? "Applying..." : "Apply to Jobs"}
      </button>
      {response && (
        <div className="application-response">
          <h3>Job Application Successful!</h3>
          <p>
            <strong>Company Name:</strong> {response.companyName}
          </p>
          <p>
            <strong>Job Title:</strong> {response.jobTitle}
          </p>
          <p>
            <strong>Location:</strong> {response.location}
          </p>
          <p>
            <strong>Job Description:</strong> {response.jobDescription}
          </p>
          <p>
            <strong>Applied Date:</strong>{" "}
            {new Date(response.appliedDate).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default ApplyToJobs;
