// src/components/AccountSettings.js
import React, { useState, useEffect } from "react";
import useDashboard from "../../../hooks/useDashboard.js";
import "../styles/Dashboard.css";

const AccountSettings = () => {
  const { accountSettings, updateAccountSettings } = useDashboard();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    // Include other settings fields if needed
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (accountSettings) {
      setFormData({
        email: accountSettings.email || "",
        password: "",
        confirmPassword: "",
        // Initialize other fields if necessary
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
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await updateAccountSettings(formData);
      if (response && response.status === 200) {
        setSuccess("Account settings updated successfully!");
        setError(null);
      } else {
        setError(response.data.message || "Failed to update account settings");
      }
    } catch (err) {
      console.error("Update error:", err);
      setError("An error occurred while updating settings");
    }
  };

  return (
    <div className="account-settings">
      <h1>Account Settings</h1>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
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
        {/* Add more fields as needed */}
        <div className="form-group">
          <button type="submit">Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default AccountSettings;
