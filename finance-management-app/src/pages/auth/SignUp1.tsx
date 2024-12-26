import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpPage1 = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

  const handleGetStarted = () => {
    // Add fade out animation before navigation
    const element = document.getElementById('signup-container');
    if (element) {
      element.classList.add('animate-fadeOut');
      setTimeout(() => {
        navigate('/signup1');
      }, 500); // Match this with animation duration
    }
  };
      
  return (
    <div id="signup-container" className="min-h-screen bg-gradient-to-br from-violet-50 via-slate-50 to-indigo-50">
      {/* Decorative background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[40%] -left-[20%] w-[640px] h-[640px] bg-violet-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-[40%] -right-[20%] w-[640px] h-[640px] bg-indigo-200/30 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 flex flex-col justify-center min-h-screen py-12 sm:px-6 lg:px-8">
        <div className="text-center transform transition-all duration-500 ease-out animate-fadeIn">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Welcome to Finance Manager
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
            Join thousands of users who are already managing their finances smarter
          </p>
          <button
            onClick={handleGetStarted}
            className="px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl 
                     font-medium transform hover:scale-105 transition-all duration-300 
                     hover:shadow-xl hover:from-violet-700 hover:to-indigo-700
                     animate-bounce hover:animate-none"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage1;