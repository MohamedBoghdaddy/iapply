import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case "LOGOUT_SUCCESS":
      return { ...state, user: null, isAuthenticated: false, loading: false };
    case "USER_LOADED":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case "AUTH_ERROR":
      return { ...state, user: null, isAuthenticated: false, loading: false };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData) => {
    dispatch({ type: "LOGIN_SUCCESS", payload: userData });
    localStorage.setItem("user", JSON.stringify(userData)); // Save user to localStorage
  };

  const logout = () => {
    dispatch({ type: "LOGOUT_SUCCESS" });
    localStorage.removeItem("user"); // Remove user from localStorage
  };

  const checkAuth = async () => {
    try {
      const token =
        document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1] || localStorage.getItem("token");

      if (token && !state.isAuthenticated) {
        const response = await axios.get(
          "http://localhost:4000/api/users/checkAuth",
          {
            withCredentials: true,
          }
        );
        const { user } = response.data;
        if (user) {
          dispatch({ type: "USER_LOADED", payload: user });
        } else {
          dispatch({ type: "AUTH_ERROR" });
        }
      } else if (!token) {
        dispatch({ type: "AUTH_ERROR" });
      }
    } catch (error) {
      console.error("Auth check failed", error);
      dispatch({ type: "AUTH_ERROR" });
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        dispatch({ type: "LOGIN_SUCCESS", payload: user });
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
        localStorage.removeItem("user");
      }
    }
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        login,
        logout,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
