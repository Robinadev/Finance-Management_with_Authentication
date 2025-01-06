import { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import CallToAction from "../components/CallToAction";
import FeatureSection from "../components/FeatureSection";
import TestimonialSection from "../components/TestimonialSection";
import Footer from "../components/Footer";

const LandingPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="bg-gradient-to-br from-violet-50 via-slate-50 to-indigo-50 min-h-screen flex flex-col">
      <Navbar />

      <main className={`flex-1 transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {/* Hero Section with Animation */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-100/30 to-indigo-100/30 backdrop-blur-md"></div>
          <HeroSection />
        </div>

        {/* Features Grid with Modern Design */}
        <div className="relative py-20">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-transparent"></div>
          <FeatureSection
            features={[
              { title: "Smart Budgeting", description: "Take control of your finances with AI-powered budgeting tools", icon: "📊", gradient: "from-violet-500 to-purple-500", animation: "scale-105" },
              { title: "Expense Tracking", description: "Track every penny with our intuitive expense management", icon: "💰", gradient: "from-indigo-500 to-blue-500", animation: "scale-105" },
              { title: "Financial Insights", description: "Get personalized insights to improve your financial health", icon: "📈", gradient: "from-blue-500 to-cyan-500", animation: "scale-105" },
              { title: "Secure Platform", description: "Your financial data is protected with bank-level security", icon: "🔒", gradient: "from-cyan-500 to-teal-500", animation: "scale-105" }
            ]}
          />
        </div>

        {/* Testimonials with Glass Effect */}
        <div className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-100/20 to-indigo-100/20 backdrop-blur-md"></div>
          <TestimonialSection
            testimonials={[
              { quote: "This app completely transformed how I manage my money!", author: "Sarah Johnson", role: "Small Business Owner", rating: 5, image: "/avatars/sarah.jpg", gradient: "from-violet-500 to-purple-500" },
              { quote: "The best financial management tool I've ever used.", author: "Michael Chen", role: "Software Engineer", rating: 5, image: "/avatars/michael.jpg", gradient: "from-indigo-500 to-blue-500" },
              { quote: "Simple, intuitive, and incredibly powerful.", author: "Emma Davis", role: "Freelancer", rating: 5, image: "/avatars/emma.jpg", gradient: "from-blue-500 to-cyan-500" }
            ]}
          />
        </div>

        {/* Statistics Section with Animation */}
        <div className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-100/30 via-indigo-100/30 to-blue-100/30"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { value: "100K+", label: "Active Users", gradient: "from-violet-600 to-indigo-600" },
                { value: "$10M+", label: "Transactions Tracked", gradient: "from-indigo-600 to-blue-600" },
                { value: "4.9/5", label: "User Rating", gradient: "from-blue-600 to-cyan-600" }
              ].map((stat, index) => (
                <div key={index} className="transform scale-100 hover:scale-105 transition-all duration-300">
                  <div className="p-8 rounded-2xl bg-white/60 backdrop-blur-md shadow-xl hover:shadow-2xl border border-white/20">
                    <p className={`text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${stat.gradient} text-center animate-pulse`}>
                      {stat.value}
                    </p>
                    <p className="mt-2 text-gray-600 font-medium text-center">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Call to Action with Gradient */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-violet-50/50"></div>
          <CallToAction />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
