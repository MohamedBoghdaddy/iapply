// src/hooks/useDashboard.js
import { useContext, useCallback } from "react";
import { DashboardContext } from "../context/DashboardContext.js";
import axios from "axios";

const useDashboard = () => {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }

  const {
    dashboard,
    accountSettings,
    appliedJobs,
    userProfile,
    fetchDashboard: contextFetchDashboard,
    updateDashboard: contextUpdateDashboard,
    // deleteDashboard: contextDeleteDashboard,
    fetchAccountSettings: contextFetchAccountSettings,
    updateAccountSettings: contextUpdateAccountSettings,
    fetchUserProfile: contextFetchUserProfile,
    updateUserProfile: contextUpdateUserProfile,
    userId,
  } = context;

const fetchDashboard = useCallback(async () => {
  if (userId) {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/dashboard/${userId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching dashboard:", error);
      throw error;
    }
  }
}, [userId]);

const updateDashboard = useCallback(
  async (data) => {
    if (userId) {
      try {
        const response = await axios.put(
          `http://localhost:4000/api/dashboard/${userId}`,
          data,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("Dashboard updated successfully:", response.data);
        return response.data;
      } catch (error) {
        console.error("Error updating dashboard:", error);
        throw error;
      }
    }
  },
  [userId]
);

  const fetchUserProfile = useCallback(async () => {
    if (userId) {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/users/${userId}`
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching user profile:", error);
        throw error;
      }
    }
  }, [userId]);

  const updateUserProfile = useCallback(
    async (data) => {
      if (userId) {
        try {
          const response = await axios.put(
            `http://localhost:4000/api/users/${userId}`,
            data,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );
          console.log("Profile updated successfully:", response.data);
          return response.data;
        } catch (error) {
          console.error("Error updating profile:", error);
          throw error;
        }
      }
    },
    [userId]
  );

  const updateAccountSettings = useCallback(
    async (formData) => {
      if (userId) {
        try {
          const response = await axios.put(
            `http://localhost:4000/api/AccountSettings/${userId}`,
            formData,
            {
              headers: { "Content-Type": "application/json" },
            }
          );
          return response.data;
        } catch (error) {
          console.error("Error updating account settings:", error);
          throw error;
        }
      }
    },
    [userId]
  );

  return {
    dashboard,
    fetchDashboard: contextFetchDashboard || fetchDashboard,
    updateDashboard: contextUpdateDashboard || updateDashboard,
    accountSettings,
    appliedJobs,
    userProfile,
    fetchAccountSettings: contextFetchAccountSettings,
    updateAccountSettings,
    fetchUserProfile: contextFetchUserProfile || fetchUserProfile,
    updateUserProfile,
  };
};

export default useDashboard;
