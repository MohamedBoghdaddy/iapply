import React from "react";
import HeroSection from "./HeroSection";
import StorytellingSection from "./StorytellingSection";
import CallToActionSection from "./CallToActionSection";
import ContactInfoSection from "./ContactInfoSection";
import "../../Styles/Home.css";

const Home = () => {
  return (
    <div className="full-page">
      <HeroSection />
      <StorytellingSection />
      <CallToActionSection />
      <ContactInfoSection />
    </div>
  );
};

export default Home;
