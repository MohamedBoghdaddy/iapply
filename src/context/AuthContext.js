import React, { createContext, useReducer, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

// Create a Context
export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "SIGNUP":
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/users/current",
          {
            withCredentials: true, // Ensure cookies are sent
          }
        );
        if (response.data.user) {
          dispatch({ type: "LOGIN", payload: response.data.user });
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  console.log("Authentication state:", state);

  const contextValue = useMemo(() => ({ ...state, dispatch }), [state]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Adding PropTypes validation
AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
