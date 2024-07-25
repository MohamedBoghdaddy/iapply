import React, { useState } from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Button, Container, Row, Col } from "reactstrap";
import { useAuthContext } from "../../../hooks/useAuthContext"; // Ensure this import path is correct
import "../styles/Sidebar.css";

const Sidebar = (props) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };

  const createLinks = (routes = []) => {
    return routes.map((prop, key) => (
      <div className="nav-item" key={key}>
        <NavLinkRRD to={prop.layout + prop.path} className="nav-link">
          <i className={prop.icon} />
          {prop.name}
        </NavLinkRRD>
      </div>
    ));
  };

  const { routes = [], logo } = props;
  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank",
    };
  }

  const { user } = useAuthContext();

  return (
    <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
      <Container fluid>
        <button
          className="sidebar-toggler"
          type="button"
          onClick={toggleSidebar}
        >
          {sidebarOpen ? "Close" : "Open"}
        </button>
        {logo ? (
          <div className="sidebar-brand" {...navbarBrandProps}>
            {/* <img
              alt={logo.imgAlt}
              className="navbar-brand-img"
              src={logo.imgSrc}
            /> */}
          </div>
        ) : null}
        <div className="nav">
          {createLinks(routes)}
          <div className="nav-item">
            <NavLinkRRD to="/AccountSettings" className="nav-link">
              <i className="ni ni-settings-gear-65" />
              Account Settings
            </NavLinkRRD>
          </div>
          <div className="nav-item">
            <NavLinkRRD to="/profile" className="nav-link">
              <i className="ni ni-single-02" />
              My Profile
            </NavLinkRRD>
          </div>
          <div className="nav-item">
            <NavLinkRRD to="/paymenthistory" className="nav-link">
              <i className="ni ni-credit-card" />
              Payment History
            </NavLinkRRD>
          </div>
          <div className="nav-item">
            <NavLinkRRD to="/jobhistory" className="nav-link">
              <i className="ni ni-briefcase-24" />
              Job History
            </NavLinkRRD>
          </div>
        </div>
      </Container>
    </div>
  );
};

Sidebar.propTypes = {
  bgColor: PropTypes.string,
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      layout: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  logo: PropTypes.object,
};

export default Sidebar;
