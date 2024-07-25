import { useContext } from "react";
import { DashboardContext } from "../context/DashboardContext";
import axios from "axios";

const useDashboard = () => {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  const { appliedJobs } = context; // Assuming jobData corresponds to appliedJobs

  const updateUser = async (userId, userData) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/users/${userId}`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you store token in localStorage
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };

  const updateAccountSettings = async (userId, userData) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/users/${userId}`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you store token in localStorage
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
    /* The line `formData.append("resume", resumeFile); // Append the resume file` is adding the resume
  file to a FormData object. In this case, the `resumeFile` variable contains the file that the
  user wants to upload as part of updating their user details. By appending the resume file to the
  FormData object, it will be included in the request payload when making a PUT request to update
  the user details and upload the resume to the server. */
  };
  // Function to update user details and upload resume
  const updateUserAndUploadResume = async (userId, userData, resumeFile) => {
    const formData = new FormData();
    formData.append("username", userData.username || "");
    formData.append("email", userData.email || "");
    formData.append("password", userData.password || "");
    formData.append("gender", userData.gender || "");
    formData.append("firstName", userData.firstName || "");
    formData.append("middleName", userData.middleName || "");
    formData.append("lastName", userData.lastName || "");
    formData.append("dateOfBirth", userData.dateOfBirth || "");
    formData.append("currentNationality", userData.currentNationality || "");
    formData.append("otherNationality", userData.otherNationality || "");
    formData.append("currentVisaStatus", userData.currentVisaStatus || "");
    formData.append("disability", userData.disability || "");
    formData.append("primaryEmailAddress", userData.primaryEmailAddress || "");
    formData.append(
      "secondaryEmailAddress",
      userData.secondaryEmailAddress || ""
    );
    formData.append("primaryPhoneNumber", userData.primaryPhoneNumber || "");
    formData.append(
      "alternatePhoneNumber",
      userData.alternatePhoneNumber || ""
    );
    formData.append("currentAddress", userData.currentAddress || "");
    formData.append("country", userData.country || "");
    formData.append("city", userData.city || "");
    formData.append("zipCode", userData.zipCode || "");
    formData.append("preferredJobTitle", userData.preferredJobTitle || "");
    formData.append(
      "preferredJobLocation",
      userData.preferredJobLocation || ""
    );
    formData.append("primarySkill", userData.primarySkill || "");
    formData.append("secondarySkill", userData.secondarySkill || "");
    formData.append("yearsOfExperience", userData.yearsOfExperience || "");
    formData.append("summary", userData.summary || "");
    formData.append("workExperience", userData.workExperience || "");
    formData.append("linkedin", userData.linkedin || "");
    formData.append("github", userData.github || "");
    formData.append("education", userData.education || "");
    formData.append("countries", userData.countries || "");
    formData.append("jobTitles", userData.jobTitles || "");
    formData.append("cv", userData.cv || "");
    formData.append("resume", resumeFile); // Append the resume file

    try {
      const response = await axios.put(
        `http://localhost:4000/api/users/${userId}/update-and-upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you store token in localStorage
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating user and uploading resume:", error);
      throw error;
    }
  };

  return {
    jobData: appliedJobs,
    updateUser,
    updateAccountSettings,
    updateUserAndUploadResume,
  };
};

export default useDashboard;
