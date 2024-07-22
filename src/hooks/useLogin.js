import { useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const useLogin = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");
      setIsLoading(true); // Set loading to true

      console.log("Login credentials:", { email, password });

      if (!validateEmail(email)) {
        setError("Please enter a valid email address.");
        setIsLoading(false); // Set loading to false
        return;
      }

      if (!password) {
        setError("Password is required.");
        setIsLoading(false); // Set loading to false
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:4000/api/users/login",
          { email, password }
        );

        console.log("Login successful:", response.data);

        if (response.data.profileSetupRequired) {
          navigate("/"); // Redirect to home setup page
        } else {
          navigate("/profile"); // Redirect to dashboard if setup is complete
        }
      } catch (error) {
        console.log("Login error:", error);
        if (error.response && error.response.data) {
          setError(error.response.data.message);
        } else {
          setError("An error occurred. Please try again.");
        }
      } finally {
        setIsLoading(false); // Set loading to false in both success and error cases
      }
    },
    [email, password, navigate]
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
