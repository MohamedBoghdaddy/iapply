import React, { createContext, useReducer, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"; // Ensure js-cookie is installed

export const DashboardContext = createContext();

const initialState = {
  accountSettings: {},
  appliedJobs: [],
  userProfile: {},
  userId: null,
};

const ActionTypes = {
  SET_ACCOUNT_SETTINGS: "SET_ACCOUNT_SETTINGS",
  SET_APPLIED_JOBS: "SET_APPLIED_JOBS",
  SET_USER_PROFILE: "SET_USER_PROFILE",
  SET_USER_ID: "SET_USER_ID",
};

const dashboardReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_ACCOUNT_SETTINGS:
      return { ...state, accountSettings: action.payload };
    case ActionTypes.SET_APPLIED_JOBS:
      return { ...state, appliedJobs: action.payload };
    case ActionTypes.SET_USER_PROFILE:
      return { ...state, userProfile: action.payload };
    case ActionTypes.SET_USER_ID:
      return { ...state, userId: action.payload };
    default:
      return state;
  }
};

const DashboardProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [state, dispatch] = useReducer(dashboardReducer, initialState);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null); // Moved inside the component

  const fetchData = async (url, actionType) => {
    if (!state.userId) return;

    try {
      const response = await axios.get(url, {
        withCredentials: true,
      });
      dispatch({ type: actionType, payload: response.data });
      setNotifications((prev) => [
        ...prev,
        { type: "success", message: `Fetched ${actionType} successfully.` },
      ]);
    } catch (error) {
      console.error(
        `Failed to fetch ${actionType}:`,
        error.response?.data || error.message
      );
      setNotifications((prev) => [
        ...prev,
        { type: "error", message: `Failed to fetch ${actionType}.` },
      ]);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/users/getone/${state.userId}` // Use state.userId
        );
        setUserData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (state.userId) {
      // Only fetch if userId is defined
      fetchUserData();
    }
  }, [state.userId]);

  useEffect(() => {
    if (!state.userId) return;

    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/users/getone/${state.userId}`,
          { withCredentials: true }
        );

        if (response.status === 200) {
          dispatch({
            type: ActionTypes.SET_USER_PROFILE,
            payload: response.data,
          });
        } else {
          console.error("Failed to fetch profile", response.status);
        }
      } catch (error) {
        console.error(
          "Error fetching profile:",
          error.response?.data || error.message
        );
      }
    };
    fetchUser();
  }, [state.userId]);

  useEffect(() => {
    if (!state.userId) return;

    const fetchInitialData = async () => {
      try {
        await Promise.all([
          fetchData(
            `http://localhost:4000/api/users/AccountSettings/${state.userId}`,
            ActionTypes.SET_ACCOUNT_SETTINGS
          ),
          fetchData(
            `http://localhost:4000/api/AppliedJobRoutes/jobs/${state.userId}`,
            ActionTypes.SET_APPLIED_JOBS
          ),
          fetchData(
            `http://localhost:4000/api/users/getone/${state.userId}`,
            ActionTypes.SET_USER_PROFILE
          ),
        ]);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [state.userId]);

  const updateProfile = async (formData, cvFile) => {
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
    // if (cvFile) {
    //   formDataToSend.append("resume", cvFile);
    // }

    try {
      const response = await axios.put(
        `http://localhost:4000/api/users/${state.userId}`,
        formDataToSend,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to update user ", error);
      throw error;
    }
  };

  return (
    <DashboardContext.Provider
      value={{
        notifications,
        accountSettings: state.accountSettings,
        appliedJobs: state.appliedJobs,
        userProfile: state.userProfile,
        userId: state.userId,
        fetchAccountSettings: () =>
          fetchData(
            `http://localhost:4000/api/AccountSettings/${state.userId}`,
            ActionTypes.SET_ACCOUNT_SETTINGS
          ),
        updateAccountSettings: async (data) => {
          try {
            const response = await axios.put(
              `http://localhost:4000/api/users/AccountSettings/${state.userId}`,
              data,
              {
                withCredentials: true,
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            return response.data;
          } catch (error) {
            console.error("Failed to update account settings", error);
            throw error;
          }
        },
        fetchAppliedJobs: () =>
          fetchData(
            `http://localhost:4000/api/AppliedJobRoutes/jobs/${state.userId}`,
            ActionTypes.SET_APPLIED_JOBS
          ),
        fetchUser: () =>
          fetchData(
            `http://localhost:4000/api/users/${state.userId}`,
            ActionTypes.SET_USER_PROFILE
          ),
        updateUserProfile: async (data) => {
          try {
            const response = await axios.put(
              `http://localhost:4000/api/users/${state.userId}`,
              data,
              {
                withCredentials: true,
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            return response.data;
          } catch (error) {
            console.error("Failed to update user profile", error);
            throw error;
          }
        },
        updateProfile,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
