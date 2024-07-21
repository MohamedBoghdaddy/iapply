import React, { createContext, useReducer, useEffect, useState } from "react";
import axios from "axios";

// Create a Context
const DashboardContext = createContext();

// Initial state
const initialState = {
  accountSettings: {},
  appliedJobs: [],
  userProfile: {},
};

// Action types
const ActionTypes = {
  SET_ACCOUNT_SETTINGS: "SET_ACCOUNT_SETTINGS",
  SET_APPLIED_JOBS: "SET_APPLIED_JOBS",
  SET_USER_PROFILE: "SET_USER_PROFILE",
  SET_USER_ID: "SET_USER_ID",
};

// Reducer function
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

// Provider component
const DashboardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);
  const [loading, setLoading] = useState(true);

  // Fetch user ID from the database
  const fetchUserId = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/auth/me"); // Adjust this endpoint as needed
      const userId = response.data.userId; // Adjust according to your response structure
      dispatch({ type: ActionTypes.SET_USER_ID, payload: userId });
    } catch (error) {
      console.error("Failed to fetch user ID", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch account settings
  const fetchAccountSettings = async () => {
    if (state.userId) {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/AccountSettings/${state.userId}`
        );
        dispatch({
          type: ActionTypes.SET_ACCOUNT_SETTINGS,
          payload: response.data,
        });
      } catch (error) {
        console.error("Failed to fetch account settings", error);
      }
    }
  };

  // Update account settings
  const updateAccountSettings = async (data) => {
    if (state.userId) {
      try {
        const response = await axios.put(
          `http://localhost:4000/api/AccountSettings/${state.userId}`,
          data
        );
        dispatch({
          type: ActionTypes.SET_ACCOUNT_SETTINGS,
          payload: response.data,
        });
      } catch (error) {
        console.error("Failed to update account settings", error);
      }
    }
  };

  // Fetch applied jobs
  const fetchAppliedJobs = async () => {
    if (state.userId) {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/AppliedJobRoutes/jobs/${state.userId}`
        );
        dispatch({
          type: ActionTypes.SET_APPLIED_JOBS,
          payload: response.data,
        });
      } catch (error) {
        console.error("Failed to fetch applied jobs", error);
      }
    }
  };

  // Fetch user profile
  const fetchUserProfile = async () => {
    if (state.userId) {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/users/${state.userId}`
        );
        dispatch({
          type: ActionTypes.SET_USER_PROFILE,
          payload: response.data,
        });
      } catch (error) {
        console.error("Failed to fetch user profile", error);
      }
    }
  };

  // Update user profile
  const updateUserProfile = async (data) => {
    if (state.userId) {
      try {
        const response = await axios.put(
          `http://localhost:4000/api/users/${state.userId}`,
          data
        );
        dispatch({
          type: ActionTypes.SET_USER_PROFILE,
          payload: response.data,
        });
      } catch (error) {
        console.error("Failed to update user profile", error);
      }
    }
  };

  useEffect(() => {
    fetchUserId();
  }, []);

  useEffect(() => {
    if (!loading) {
      fetchAccountSettings();
      fetchAppliedJobs();
      fetchUserProfile();
    }
  }, [state.userId, loading]);

  return (
    <DashboardContext.Provider
      value={{
        accountSettings: state.accountSettings,
        appliedJobs: state.appliedJobs,
        userProfile: state.userProfile,
        fetchAccountSettings,
        updateAccountSettings,
        fetchAppliedJobs,
        fetchUserProfile,
        updateUserProfile,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export { DashboardProvider, DashboardContext };
