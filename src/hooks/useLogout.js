import { useCallback } from "react";
import axios from "axios"; // Import axios for API requests

export const useLogout = () => {
  const logout = useCallback(async () => {
    try {
      // Call the logout API endpoint
      await axios.post("http://localhost:4000/api/users/logout"); // Adjust the endpoint URL as needed

      // Remove user from storage
      localStorage.removeItem("user");

      // Dispatch logout action
      dispatchEvent(new CustomEvent("LOGOUT"));
    } catch (error) {
      console.error("Logout error:", error);
      // Handle logout error if needed
    }
  }, []);

  return { logout };
};
