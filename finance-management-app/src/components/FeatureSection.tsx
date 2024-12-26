interface Feature {
    title: string;
    description: string;
    icon: string;
    gradient: string;
    animation: string;
  }
  
  interface FeatureSectionProps {
    features: Feature[];
  }
  
  const FeatureSection = ({ features }: FeatureSectionProps) => {
    return (
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Everything you need to manage your finances
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features to help you take control of your money
            </p>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`transform transition-all duration-300 ${feature.animation}`}
              >
                <div className="h-full p-8 rounded-2xl bg-white/60 backdrop-blur-xl shadow-lg hover:shadow-xl border border-white/20">
                  <div className={`text-5xl mb-6 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default FeatureSection;