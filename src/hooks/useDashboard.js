// src/hooks/useDashboard.js
import { useContext, useState, useCallback } from "react";
import { DashboardContext } from "../context/DashboardContext.js";
import axios from "axios";

const useDashboard = () => {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }

  const {
    accountSettings,
    updateAccountSettings: contextUpdateAccountSettings,
  } = context;

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/profile");
      return response.data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  };
  // Define the updateUserProfile function
  const updateUserProfile = useCallback(async (data) => {
    try {
      const response = await axios.put(
        "http://localhost:4000/api/users/userId",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Profile updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
      // Handle errors appropriately
    }
  }, []);
  const updateAccountSettings = async (formData) => {
    try {
      const response = await axios.put(
        "http://localhost:4000/api/AccountSettings",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response;
    } catch (error) {
      console.error("Error updating account settings:", error);
      throw error;
    }
  };

  return {
    accountSettings,
    updateAccountSettings:
      updateAccountSettings || contextUpdateAccountSettings,
    updateUserProfile,
  };
};

export default useDashboard;
