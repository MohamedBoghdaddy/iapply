import React, { useState } from "react";
import { Navbar, Nav, Container, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import logo from "../static/images/logo.jpeg"; // Adjust path as per your project
import Login from "../LoginSystem/Login/Login"; // Adjusted path to Login component
import { useLogout } from "../../../hooks/useLogout";
import { useAuthContext } from "../../../hooks/useAuthContext";

const NavBar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthContext(); // Get the user from AuthContext

  const { logout } = useLogout();

  const handleLoginModalOpen = () => {
    setShowLoginModal(true);
  };

  const handleLoginModalClose = () => {
    setShowLoginModal(false);
  };

  const handleNavCollapse = () => setExpanded(!expanded);

  const handleLogout = async () => {
    await logout(); // Await the logout function if it's async
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="navbar" variant="dark" expanded={expanded}>
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="navbar-brand">
          <img
            src={logo}
            alt="Company Logo"
            style={{ width: "80px", height: "auto", top: 0 }}
          />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="navbar-toggler"
          onClick={handleNavCollapse}
        />
        <Navbar.Collapse id="navbarScroll" className="navbar-collapse">
          <Nav className="navbar-nav ms-auto" navbarScroll>
            <ScrollLink
              to="hero-section"
              smooth
              className="nav-link"
              onClick={handleNavCollapse}
            >
              HOME
            </ScrollLink>
            <ScrollLink
              to="WhoWeAre"
              smooth
              className="nav-link"
              onClick={handleNavCollapse}
            >
              WHO WE ARE
            </ScrollLink>
            <ScrollLink
              to="serve"
              smooth
              className="nav-link"
              onClick={handleNavCollapse}
            >
              WHO WE SERVE
            </ScrollLink>
            <ScrollLink
              to="how-it-works"
              smooth
              className="nav-link"
              onClick={handleNavCollapse}
            >
              HOW IT WORKS
            </ScrollLink>
            <ScrollLink
              to="features"
              smooth
              className="nav-link"
              onClick={handleNavCollapse}
            >
              FEATURES
            </ScrollLink>
            <ScrollLink
              to="pricing"
              smooth
              className="nav-link"
              onClick={handleNavCollapse}
            >
              PRICING
            </ScrollLink>
            {user && (
              <Nav.Link
                as={Link}
                to="/dashboard"
                className="nav-link"
                onClick={handleNavCollapse}
              >
                Dashboard
              </Nav.Link>
            )}

            <Nav.Link
              as={Link}
              to="/contact"
              className="nav-link"
              onClick={handleNavCollapse}
            >
              Contact Us
            </Nav.Link>
            {user && (
              <div
                className="nav-link"
                role="button"
                tabIndex="0"
                onClick={handleLogout}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleLogout();
                  }
                }}
              >
                <FontAwesomeIcon icon={faSignOutAlt} /> Logout
              </div>
            )}
            {!user && (
              <div
                className="nav-link"
                role="button"
                tabIndex="0"
                onClick={() => {
                  handleLoginModalOpen();
                  handleNavCollapse();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleLoginModalOpen();
                    handleNavCollapse();
                  }
                }}
              >
                <FontAwesomeIcon icon={faUser} />
              </div>
            )}
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

export default NavBar;
