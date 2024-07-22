import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";
import {
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillGearFill,
} from "react-icons/bs";
import { useAuthContext } from "../../../hooks/useAuthContext";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const sidebarRef = useRef(null);
  const { user } = useAuthContext(); // Access user from context

  const handleMouseEnter = () => {
    setIsCollapsed(false);
  };

  const handleMouseLeave = () => {
    setIsCollapsed(true);
  };

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`sidebar ${isCollapsed ? "collapsed" : ""}`}
      ref={sidebarRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="userdetails">
        {user && <p>Welcome, {user.username}!</p>}
      </div>
      <button
        className="toggle-button"
        onClick={handleToggle}
        aria-label="Toggle Sidebar"
      >
        {isCollapsed ? ">" : "<"}
      </button>
      <ul className="menulist">
        <li className="item">
          <Link to="/dashboard">
            <BsGrid1X2Fill className="icon" />
            {!isCollapsed && "Dashboard"}
          </Link>
        </li>
        <li className="item">
          <Link to="/profile">
            <BsPeopleFill className="icon" />
            {!isCollapsed && "My Profile"}
          </Link>
        </li>
        <li className="item">
          <Link to="/jobhistory">
            <BsFillArchiveFill className="icon" />
            {!isCollapsed && "Job History"}
          </Link>
        </li>
        <li className="item">
          <Link to="/paymenthistory">
            <BsFillGrid3X3GapFill className="icon" />
            {!isCollapsed && "Payment History"}
          </Link>
        </li>
        <li className="item">
          <Link to="/accountsettings">
            <BsFillGearFill className="icon" />
            {!isCollapsed && "Account Settings"}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
