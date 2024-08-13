import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

export const DashboardContext = createContext();

const DashboardProvider = ({ children }) => {
  const { state } = useAuthContext();
  const { user, isAuthenticated } = state;

  const [view, setView] = useState("list");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    accountSettings: {},
    appliedJobs: [],
    userProfile: {},
    userId: null,
  });
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);

  const fetchUserData = useCallback(async () => {
    try {
      if (user && user._id) {
        const response = await axios.get(
          `http://localhost:4000/api/users/getone/${user._id}`,
          {
            withCredentials: true,
          }
        );
        console.log("Fetched User Data:", response.data);
        setUserData(response.data);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (isAuthenticated && user && view === "profile") {
      fetchUserData();
    }
  }, [isAuthenticated, user, view, fetchUserData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileData = userData.userProfile;
        if (!profileData) {
          await fetchUserData();
          setFormData(userData.userProfile || {});
        } else {
          setFormData(profileData);
        }
        console.log("Form Data:", formData); // Debugging
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchData();
  }, [fetchUserData, userData, formData]); // Add formData to the dependency array

  const updateProfile = async (formData, cvFile) => {
    if (editingId) {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      if (cvFile) {
        formDataToSend.append("cvFile", cvFile);
      }

      try {
        const response = await axios.put(
          `http://localhost:4000/api/update/${editingId}`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success(response.data.msg, { position: "top-right" });
        setView("profile");
      } catch (error) {
        if (error.response && error.response.data.error) {
          alert(error.response.data.error);
        } else {
          console.error("Error submitting form:", error);
        }
      }
    }
  };

  return (
    <DashboardContext.Provider
      value={{
        view,
        setView,
        notifications,
        loading,
        userData,
        editingId,
        setEditingId,
        updateProfile,
        fetchUserData,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
