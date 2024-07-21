import React from "react";
import { useNavigate } from "react-router-dom";
import "../../Components/styles/Home.css";

const CallToActionSection = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/signup");
  };

  return (
    <section className="cta-section">
      <h2>Join Us Today</h2>
      <p>Register and start applying for your dream jobs with ease.</p>
      <button onClick={handleRegisterClick}>Register Now</button>
    </section>
  );
};

export default CallToActionSection;
