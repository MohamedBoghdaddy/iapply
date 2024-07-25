import React, { createContext, useReducer, useEffect } from "react";
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
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
      };
    case "USER_LOADED":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case "AUTH_ERROR":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/user", {
          withCredentials: true,
        });
        dispatch({ type: "USER_LOADED", payload: response.data.user });
      } catch (error) {
        dispatch({ type: "AUTH_ERROR" });
      }
    };
    loadUser();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/users/login",
        credentials,
        {
          withCredentials: true,
        }
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data.user });
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:4000/api/auth/users/logout",
        {},
        { withCredentials: true }
      );
      dispatch({ type: "LOGOUT_SUCCESS" });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
