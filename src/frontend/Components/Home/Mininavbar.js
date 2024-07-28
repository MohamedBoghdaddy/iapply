import React, { useState } from "react";
import { Navbar, Nav, Container, Form, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faUser,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/navbar.css";
import logo from "../static/images/logo.jpeg";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import Login from "../LoginSystem/Login/Login"; // Adjusted path to Login component
import { useLogout } from "../../../hooks/useLogout";
import useAuthHook from "../../../hooks/AuthHook"; // Default import
const Mininavbar = () => {
  const [searchText, setSearchText] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { logout } = useLogout();
  const { user } = useAuthHook();

  const navigate = useNavigate();

  const handleSearch = () => {
    console.log(`Searching for: ${searchText}`);
  };

  const handleLoginModalOpen = () => {
    setShowLoginModal(true);
  };

  const handleLoginModalClose = () => {
    setShowLoginModal(false);
  };

  const handleNavCollapse = () => setExpanded(!expanded);

  const handleLogout = async () => {
    logout();
    // Redirect to login
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="navbar">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="navbar-brand">
          <img
            src={logo}
            alt="Company Logo"
            style={{ width: "60px", height: "auto" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navbarScroll"
          className="navbar-toggler"
          onClick={handleNavCollapse}
        />
        <Navbar.Collapse
          id="navbarScroll"
          className="navbar-collapse"
          in={expanded}
        >
          <Nav className="navbar-nav" navbarScroll>
            <Link to="/" className="nav-link">
              HOME
            </Link>
            <Link to="/dashboard" className="nav-link">
              Dashboard
            </Link>
            <Link to="/contact" className="nav-link">
              Contact Us
            </Link>
           
                <div className="nav-link"></div>
                <div className="nav-link" onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                </div>
           
         
              <div
                className="nav-link"
                onClick={() => {
                  handleLoginModalOpen();
                  handleNavCollapse();
                }}
              >
                <FontAwesomeIcon icon={faUser} />
              </div>
          </Nav>
        </Navbar.Collapse>
      </Container>

      <Modal show={showLoginModal} onHide={handleLoginModalClose} centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Login /> {/* Render your existing login component here */}
        </Modal.Body>
      </Modal>
    </Navbar>
  );
};

export default Mininavbar;
