import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import maram2 from "../static/images/logo.jpeg";
import "../../Components/styles/Home.css";

const StorytellingSection = () => (
  <Container className="storytelling-section" id="About us">
    <Row>
      <Col md={6}>
        <img
          src={maram2}
          alt="Company-team"
          style={{ width: "400px", height: "auto" }}
        />
      </Col>
      <Col md={6}>
        <h2>Our Story</h2>
        <p>
          Welcome to the forefront of job searching: our AI-driven automatic job
          search portal, a pioneering initiative by a seasoned team from the
          management, training, technology, and IT sectors. Our expertise spans
          various disciplines, uniting to revolutionize how job seekers connect
          with opportunities.
        </p>
        <p>
          We're not just innovators; we're recognized leaders, having garnered
          numerous national and international awards for our global
          contributions to technology and employment solutions. Our platform
          leverages cutting-edge AI technology to streamline the job search
          process, ensuring that candidates find not just any job, but the right
          fit—quickly and efficiently.
        </p>
        <p>
          Our mission is simple yet ambitious: to empower job seekers worldwide
          by transforming the job searching landscape. With our intelligent
          tools, users can automatically match with positions that align with
          their skills, experience, and preferences, saving time and increasing
          success rates.
        </p>
        <p>
          Join us on this transformative journey. Whether you're seeking your
          first job, a career change, or a new opportunity, our portal is
          designed to navigate the complexities of the job market and propel you
          towards your professional goals. Start your search with us today, and
          experience the future of job hunting!
        </p>
      </Col>
    </Row>
  </Container>
);

export default StorytellingSection;
