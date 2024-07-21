import React, { createContext, useReducer, useEffect } from "react";
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
    default:
      return state;
  }
};

// Provider component
const DashboardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);
  const userId = "your-user-id"; // Replace with actual user ID

  // Fetch account settings
  const fetchAccountSettings = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/AccountSettings/${userId}`
      );
      dispatch({
        type: ActionTypes.SET_ACCOUNT_SETTINGS,
        payload: response.data,
      });
    } catch (error) {
      console.error("Failed to fetch account settings", error);
    }
  };

  // Update account settings
  const updateAccountSettings = async (data) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/AccountSettings/${userId}`,
        data
      );
      dispatch({
        type: ActionTypes.SET_ACCOUNT_SETTINGS,
        payload: response.data,
      });
    } catch (error) {
      console.error("Failed to update account settings", error);
    }
  };

  // Fetch applied jobs
  const fetchAppliedJobs = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/AppliedJobRoutes/jobs/${userId}`
      );
      dispatch({ type: ActionTypes.SET_APPLIED_JOBS, payload: response.data });
    } catch (error) {
      console.error("Failed to fetch applied jobs", error);
    }
  };

  // Fetch user profile
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/users/${userId}`
      );
      dispatch({ type: ActionTypes.SET_USER_PROFILE, payload: response.data });
    } catch (error) {
      console.error("Failed to fetch user profile", error);
    }
  };

  // Update user profile
  const updateUserProfile = async (data) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/users/${userId}`,
        data
      );
      dispatch({ type: ActionTypes.SET_USER_PROFILE, payload: response.data });
    } catch (error) {
      console.error("Failed to update user profile", error);
    }
  };

  useEffect(() => {
    fetchAccountSettings();
    fetchUserProfile();
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        accountSettings: state.accountSettings,
        appliedJobs: state.appliedJobs,
        userProfile: state.userProfile,
        fetchAccountSettings,
        updateAccountSettings,
        fetchAppliedJobs, // Ensure this is included
        fetchUserProfile,
        updateUserProfile,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export { DashboardProvider, DashboardContext };
