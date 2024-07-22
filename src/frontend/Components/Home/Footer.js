import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

import "../styles/footer.css";

function Footer() {
  return (
    <section className="footer">
      <div className="footer-container">
        <div className="footer-col">
          <h4>HKI AI</h4>
          <p>
            Welcome to HKI AI, where innovation meets excellence. We specialize
            in leveraging cutting-edge AI technology to streamline your job
            application process and enhance your career opportunities. Our
            platform is designed to simplify your job search, applying to
            thousands of positions globally with just a few clicks. Stay ahead
            in the competitive job market with our tailored AI-driven solutions.
            Connect with us and discover how we can help you achieve your career
            goals.
          </p>

          <div className="icons">
            <a href="https://www.facebook.com/hedj.eg">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>{" "}
            <a href="https://www.instagram.com/hedj.eg/">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://www.linkedin.com/company/hedj/">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Subscribe to our Newsletter</h4>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Footer;
