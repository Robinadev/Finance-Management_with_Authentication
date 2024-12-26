import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import CallToAction from "../components/CallToAction";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <CallToAction />
      </main>
    </div>
  );
};

export default LandingPage;