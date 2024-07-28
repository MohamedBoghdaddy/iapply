import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaHistory, FaCog, FaBell } from "react-icons/fa";
import "../styles/Sidebar.css";
import useAuthHook from "../../../hooks/AuthHook"; // Default import
// import { useAuthContext } from "./../../context/AuthContext";

const Sidebar = () => {
  const { user, isAuthenticated } = useAuthHook();

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>{isAuthenticated ? `Welcome, ${user?.name}` : "Guest"}</h2>
        {/* Fallback to "Guest" if user is null */}
      </div>
      <ul className="sidebar-menu">
        <li>
          <Link to="/dashboard">
            <FaUser /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <FaUser /> Profile
          </Link>
        </li>
        <li>
          <Link to="/JobHistory">
            <FaHistory /> Job History
          </Link>
        </li>
        <li>
          <Link to="/ApplyToJobs">
            <FaHistory /> Apply to Jobs
          </Link>
        </li>
        <li>
          <Link to="/PaymentHistory">
            <FaHistory /> Payment History
          </Link>
        </li>
        <li>
          <Link to="/AccountSettings">
            <FaCog /> Account Settings
          </Link>
        </li>
        <li>
          <Link to="/notifications">
            <FaBell /> Notifications
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
