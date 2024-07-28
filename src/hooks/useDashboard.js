import { useContext } from "react";
import { DashboardContext } from "../context/DashboardContext";
import axios from "axios";

export const useDashboard = () => {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  const { appliedJobs } = context; // Assuming jobData corresponds to appliedJobs

  const updateUser = async (userId, userData) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/profile/${userId}`,
        userData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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
        userData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };

  // Function to update user details and upload resume
  const updateUserAndUploadResume = async (
    userId,
    userData,
    resumeFile,
    cvFile
  ) => {
    const formData = new FormData();

    Object.keys(userData).forEach((key) => {
      formData.append(key, userData[key] || "");
    });

    if (cvFile) {
      formData.append("resume", cvFile);
    }

    try {
      const response = await axios.put(
        `http://localhost:4000/api/users/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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
