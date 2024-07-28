import { useState, useCallback } from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

 const useAuthHook = () => {
  const { user, isAuthenticated, loading, setUserId } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const login = useCallback(
    async (email, password) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.post(
          "http://localhost:4000/api/users/login",
          {
            email,
            password,
          },
          { withCredentials: true } // Ensure cookies are sent
        );

        // Assuming the API returns the user and userId
        setUserId(response.data.userId);
        navigate("/dashboard"); // Redirect after successful login
      } catch (err) {
        setError("Login failed. Please check your credentials.");
      } finally {
        setIsLoading(false);
      }
    },
    [setUserId, navigate]
  );

  const logout = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      await axios.post(
        "http://localhost:4000/api/users/logout",
        {},
        {
          withCredentials: true,
        }
      );
      setUserId(null);
      navigate("/login"); // Redirect to login after logout
    } catch (err) {
      setError("Logout failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [setUserId, navigate]);

  const checkAuthentication = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get("http://localhost:4000/api/auth/check", {
        withCredentials: true,
      });

      if (response.data.isAuthenticated) {
        setUserId(response.data.userId);
      } else {
        setUserId(null);
      }
    } catch (err) {
      setError("Failed to check authentication status.");
    } finally {
      setIsLoading(false);
    }
  }, [setUserId]);

  return {
    user,
    isAuthenticated,
    loading,
    error,
    isLoading,
    login,
    logout,
    checkAuthentication,
  };
};

export default useAuthHook;
