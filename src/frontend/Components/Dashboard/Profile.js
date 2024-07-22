import React, { useState, useEffect, useContext } from "react";
import { DashboardContext } from "../../../context/DashboardContext"; // Correct import
import "../styles/Dashboard.css";

const UserProfile = () => {
  const { userProfile, updateUserAndUploadResume, fetchUserProfile } =
    useContext(DashboardContext);

  const [formData, setFormData] = useState({});
  const [cvFile, setCvFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userProfile) {
          const profileData = await fetchUserProfile();
          setFormData(profileData);
        } else {
          setFormData(userProfile);
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchData();
  }, [fetchUserProfile, userProfile]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCvUpload = (e) => {
    setCvFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserAndUploadResume(formData._id, formData, cvFile);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  if (!formData) {
    return <p>Loading...</p>;
  }

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
          <input
            type="text"
            placeholder="Zip Code"
            name="zipCode"
            value={formData.zipCode || ""}
            onChange={handleInputChange}
          />
        </div>

        {/* Job Preferences */}
        <div className="job-preferences">
          <h4>Job Preferences</h4>
          <input
            type="text"
            placeholder="Preferred Job Title"
            name="preferredJobTitle"
            value={formData.preferredJobTitle || ""}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Preferred Job Location"
            name="preferredJobLocation"
            value={formData.preferredJobLocation || ""}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Primary Skill"
            name="primarySkill"
            value={formData.primarySkill || ""}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Secondary Skill"
            name="secondarySkill"
            value={formData.secondarySkill || ""}
            onChange={handleInputChange}
          />
          <input
            type="number"
            placeholder="Years of Experience"
            name="yearsOfExperience"
            value={formData.yearsOfExperience || ""}
            onChange={handleInputChange}
          />
          <textarea
            placeholder="Summary"
            name="summary"
            value={formData.summary || ""}
            onChange={handleInputChange}
          />
        </div>

        {/* Work Experience */}
        <div className="work-experience">
          <h4>Work Experience</h4>
          <textarea
            placeholder="Work Experience"
            name="workExperience"
            value={formData.workExperience || ""}
            onChange={handleInputChange}
          />
        </div>

        {/* Education */}
        <div className="education">
          <h4>Education</h4>
          <textarea
            placeholder="Education"
            name="education"
            value={formData.education || ""}
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
