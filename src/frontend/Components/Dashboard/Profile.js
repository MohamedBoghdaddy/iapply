import React, { useState, useEffect } from "react";
import useDashboard from "../../../hooks/useDashboard";
import "../styles/Dashboard.css";

const UserProfile = () => {
  const { updateUserProfile, fetchUserProfile } = useDashboard();
  const [formData, setFormData] = useState({});
  const [cvFile, setCvFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileData = await fetchUserProfile();
        setFormData(profileData);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchData();
  }, [fetchUserProfile]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCvUpload = (e) => {
    setCvFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    for (const key in formData) {
      data.append(key, formData[key]);
    }

    if (cvFile) {
      data.append("cv", cvFile);
    }

    try {
      await updateUserProfile(data);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="profile">
      <h1>Profile Setup</h1>
      <form onSubmit={handleSubmit}>
        {/* Personal Information */}
        <div className="personal-info">
          <h4>Personal Information</h4>
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={formData.firstName || ""}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Middle Name"
            name="middleName"
            value={formData.middleName || ""}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName || ""}
            onChange={handleInputChange}
          />
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={formData.email || ""}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Phone Number"
            name="phone"
            value={formData.phone || ""}
            onChange={handleInputChange}
          />
        </div>

        {/* Location Information */}
        <div className="location-info">
          <h4>Location Information</h4>
          <input
            type="text"
            placeholder="Country"
            name="country"
            value={formData.country || ""}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="City"
            name="city"
            value={formData.city || ""}
            onChange={handleInputChange}
          />
        </div>

        {/* Job Preferences */}
        <div className="job-preferences">
          <h4>Job Preferences</h4>
          <input
            type="text"
            placeholder="Job Title"
            name="jobTitle"
            value={formData.jobTitle || ""}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Preferred Salary"
            name="preferredSalary"
            value={formData.preferredSalary || ""}
            onChange={handleInputChange}
          />
        </div>

        {/* CV Upload */}
        <div className="cv-upload">
          <h4>CV Upload</h4>
          <input
            type="file"
            name="cv"
            accept=".pdf,.doc,.docx"
            onChange={handleCvUpload}
          />
        </div>

        <button type="submit">Save Changes</button>
      </form>
      {Object.keys(formData).length === 0 && (
        <p>
          No profile data available. Please fill out the form to create your
          profile.
        </p>
      )}
    </div>
  );
};

export default UserProfile;
