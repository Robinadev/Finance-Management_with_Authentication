const HeroSection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-[40%] -left-[20%] w-[640px] h-[640px] bg-violet-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-[40%] -right-[20%] w-[640px] h-[640px] bg-indigo-200/30 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-24 h-24 bg-white/10 backdrop-blur-lg rounded-2xl
                      transform rotate-${Math.random() * 360} animate-float-${i}`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main Heading */}
          <h1 className="text-6xl font-extrabold">
            <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent
                           animate-gradient">
              Manage Your Finances
            </span>
            <br />
            <span className="text-gray-800">With Confidence</span>
          </h1>

          {/* Subheading with enhanced typography */}
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Take control of your financial future with our 
            <span className="text-indigo-600 font-semibold"> AI-powered </span> 
            platform. Track expenses, set budgets, and achieve your goals with ease.
          </p>

          {/* CTA Buttons with modern design */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <button 
              className="group relative px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl 
                       font-medium transform hover:scale-105 transition-all duration-300 
                       hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] overflow-hidden"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-violet-700 to-indigo-700 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            <button 
              className="px-8 py-4 border-2 border-indigo-600 text-indigo-600 rounded-xl font-medium
                       transform hover:scale-105 transition-all duration-300 hover:bg-indigo-50
                       hover:shadow-lg backdrop-blur-sm"
            >
              Learn More
            </button>
          </div>

          {/* Trust badges */}
          <div className="pt-12 flex items-center justify-center space-x-8">
            {['256-bit Security', 'ISO 27001', '24/7 Support'].map((badge, index) => (
              <div key={index} 
                   className="flex items-center space-x-2 px-4 py-2 bg-white/60 rounded-lg backdrop-blur-sm
                            shadow-sm hover:shadow-md transition-all duration-300">
                <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                </svg>
                <span className="text-sm font-medium text-gray-600">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;