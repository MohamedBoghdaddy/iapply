// context/DashboardContext.js
import React, { createContext, useReducer, useEffect, useState } from "react";
import axios from "axios";

const DashboardContext = createContext();

const initialState = {
  dashboard: {},
  accountSettings: {},
  appliedJobs: [],
  userProfile: {},
  userId: null,
};

const ActionTypes = {
  SET_DASHBOARD: "SET_DASHBOARD",
  SET_ACCOUNT_SETTINGS: "SET_ACCOUNT_SETTINGS",
  SET_APPLIED_JOBS: "SET_APPLIED_JOBS",
  SET_USER_PROFILE: "SET_USER_PROFILE",
  SET_USER_ID: "SET_USER_ID",
};

const dashboardReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_DASHBOARD:
      return { ...state, dashboard: action.payload };
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
  const [dashboard, setDashboard] = useState(null);
  const [state, dispatch] = useReducer(dashboardReducer, initialState);
  const [loading, setLoading] = useState(true);

  const fetchUserId = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/users/me", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      dispatch({
        type: ActionTypes.SET_USER_ID,
        payload: response.data.userId,
      });
    } catch (error) {
      console.error("Failed to fetch user ID", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async (url, actionType) => {
    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      dispatch({ type: actionType, payload: response.data });
    } catch (error) {
      console.error(`Failed to fetch ${actionType}`, error);
    }
  };

  useEffect(() => {
    fetchUserId();
  }, []);

  useEffect(() => {
    if (!loading && state.userId) {
      fetchData(
        `http://localhost:4000/api/dashboard/${state.userId}`,
        ActionTypes.SET_DASHBOARD
      );
      fetchData(
        `http://localhost:4000/api/AccountSettings/${state.userId}`,
        ActionTypes.SET_ACCOUNT_SETTINGS
      );
      fetchData(
        `http://localhost:4000/api/AppliedJobRoutes/jobs/${state.userId}`,
        ActionTypes.SET_APPLIED_JOBS
      );
      fetchData(
        `http://localhost:4000/api/users/${state.userId}`,
        ActionTypes.SET_USER_PROFILE
      );
    }
  }, [state.userId, loading]);

  return (
    <DashboardContext.Provider
      value={{
        dashboard: state.dashboard,
        accountSettings: state.accountSettings,
        appliedJobs: state.appliedJobs,
        userProfile: state.userProfile,
        userId: state.userId,

        fetchDashboard: () =>
          fetchData(
            `http://localhost:4000/api/dashboard/${state.userId}`,
            ActionTypes.SET_DASHBOARD
          ),
        updateDashboard: async (data) => {
          try {
            const response = await axios.put(
              `http://localhost:4000/api/dashboard/${state.userId}`,
              data,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                  "Content-Type": "application/json",
                },
              }
            );
            return response.data;
          } catch (error) {
            console.error("Failed to update dashboard", error);
            throw error;
          }
        },
        updateDashboard: async (data) => {
          try {
            const response = await axios.put(
              `http://localhost:4000/api/dashboard/${state.userId}`,
              data,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                  "Content-Type": "application/json",
                },
              }
            );
            return response.data;
          } catch (error) {
            console.error("Failed to update dashboard", error);
            throw error;
          }
        },
        // deleteDashboard: async () => {
        //   try {
        //     const response = await axios.delete(
        //       `http://localhost:4000/api/dashboard/${state.userId}`,
        //       {
        //         headers: {
        //           Authorization: `Bearer ${localStorage.getItem("token")}`,
        //         },
        //       }
        //     );
        //     return response.data;
        //   } catch (error) {
        //     console.error("Failed to delete dashboard", error);
        //     throw error;
        //   }
        // },
        fetchAccountSettings: () =>
          fetchData(
            `http://localhost:4000/api/AccountSettings/${state.userId}`,
            ActionTypes.SET_ACCOUNT_SETTINGS
          ),
        updateAccountSettings: async (data) => {
          try {
            const response = await axios.put(
              `http://localhost:4000/api/AccountSettings/${state.userId}`,
              data,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
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
        fetchUserProfile: () =>
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
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            return response.data;
          } catch (error) {
            console.error("Failed to update user profile", error);
            throw error;
          }
        },
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export { DashboardProvider, DashboardContext };
