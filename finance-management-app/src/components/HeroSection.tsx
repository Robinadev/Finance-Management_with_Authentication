const HeroSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-teal-600 to-teal-400 bg-clip-text text-transparent">
            Manage Your Finances Efficiently
          </h2>
          <p className="text-xl text-gray-600">
            Take control of your financial future with our comprehensive finance management platform. 
            Track expenses, set budgets, and achieve your financial goals with ease.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              className="px-6 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors duration-200"
            >
              Get Started
            </button>
            <button 
              className="px-6 py-3 border-2 border-teal-600 text-teal-600 rounded-md hover:bg-teal-50 transition-colors duration-200"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;