// filepath: /c:/Users/user/Desktop/Finance Management with Authentication/finance-management-app/src/pages/LandingPage.tsx
import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import CallToAction from "../components/CallToAction";

const LandingPage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CallToAction />
    </div>
  );
};

export default LandingPage;