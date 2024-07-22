// Example usage in AccountSettings.js
import React, { useState, useEffect } from "react";
import useDashboard from "../../../hooks/useDashboard.js";
import Notification from "./Notification.js";
import "../styles/Dashboard.css";

const AccountSettings = () => {
  const { accountSettings, updateAccountSettings } = useDashboard();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (accountSettings) {
      setFormData({
        email: accountSettings.email || "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [accountSettings]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setNotification({ type: "error", message: "Passwords do not match" });
      return;
    }

    try {
      const response = await updateAccountSettings(formData);
      if (response && response.status === 200) {
        setNotification({
          type: "success",
          message: "Account settings updated successfully!",
        });
      } else {
        setNotification({
          type: "error",
          message:
            response?.data?.message || "Failed to update account settings",
        });
      }
    } catch (err) {
      setNotification({
        type: "error",
        message: "An error occurred while updating settings",
      });
    }
  };

  return (
    <div className="account-settings">
      <h1>Account Settings</h1>
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Update Settings</button>
      </form>
    </div>
  );
};

export default AccountSettings;
