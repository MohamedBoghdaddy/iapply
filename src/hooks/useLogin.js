import { useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");
      setIsLoading(true);

      if (!validateEmail(email)) {
        setError("Please enter a valid email address.");
        setIsLoading(false);
        return;
      }

      if (!password) {
        setError("Password is required.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:4000/api/users/login",
          { email, password },
          { withCredentials: true } // Ensure cookies are sent
        );

        dispatch({ type: "LOGIN", payload: response.data.user });

        if (response.data.profileSetupRequired) {
          navigate("/");
        } else {
          navigate("/profile");
        }
      } catch (error) {
        console.log("Login error:", error);
        setError(
          error.response?.data?.message ||
            "An error occurred. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    },
    [email, password, dispatch, navigate]
  );

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    error,
    isLoading,
    handleLogin,
  };
};
