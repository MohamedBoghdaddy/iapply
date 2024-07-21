import React, { createContext, useReducer, useMemo, useEffect } from "react";
import PropTypes from "prop-types";

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
  const [state, dispatch] = useReducer(authReducer, { user: JSON.parse(localStorage.getItem("user"))
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch({ type: "LOGIN", payload: user });
      dispatch({ type: "SIGNUP", payload: user });
    }
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
