import React from "react";
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
  const { user } = useAuthContext(); // Access user from context

  return (
    <div className="sidebar">
      <div className="userdetails">
        {user && <p>Welcome, {user.username}!</p>}
      </div>
      <ul className="menulist">
        <li className="item">
          <Link to="/dashboard">
            <BsGrid1X2Fill className="icon" />
            Dashboard
          </Link>
        </li>
        <li className="item">
          <Link to="/profile">
            <BsPeopleFill className="icon" />
            My Profile
          </Link>
        </li>
        <li className="item">
          <Link to="/jobhistory">
            <BsFillArchiveFill className="icon" />
            Job History
          </Link>
        </li>
        <li className="item">
          <Link to="/paymenthistory">
            <BsFillGrid3X3GapFill className="icon" />
            Payment History
          </Link>
        </li>
        <li className="item">
          <Link to="/accountsettings">
            <BsFillGearFill className="icon" />
            Account Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
