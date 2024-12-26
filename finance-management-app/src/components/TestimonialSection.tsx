interface Testimonial {
    quote: string;
    author: string;
    role: string;
    rating: number;
    image: string;
    gradient: string;
  }
  
  interface TestimonialSectionProps {
    testimonials: Testimonial[];
  }
  
  const TestimonialSection = ({ testimonials }: TestimonialSectionProps) => {
    const renderStars = (rating: number) => {
      return Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          className={`h-5 w-5 ${
            index < rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
        </svg>
      ));
    };
  
    return (
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied users who have transformed their financial management
            </p>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="transform hover:scale-105 transition-all duration-300"
              >
                <div className="h-full p-8 rounded-2xl bg-white/60 backdrop-blur-xl shadow-xl hover:shadow-2xl border border-white/20">
                  {/* Rating */}
                  <div className="flex mb-4">
                    {renderStars(testimonial.rating)}
                  </div>
  
                  {/* Quote */}
                  <p className="text-gray-600 italic mb-6 text-lg">
                    "{testimonial.quote}"
                  </p>
  
                  {/* Author Info */}
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className={`h-12 w-12 rounded-full object-cover border-2 bg-gradient-to-r ${testimonial.gradient}`}
                        src={testimonial.image}
                        alt={testimonial.author}
                      />
                    </div>
                    <div className="ml-4">
                      <p className={`text-lg font-semibold bg-gradient-to-r ${testimonial.gradient} bg-clip-text text-transparent`}>
                        {testimonial.author}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
  
          {/* Additional Social Proof */}
          <div className="mt-16 text-center">
            <p className="text-gray-600 font-medium">
              Trusted by professionals from companies like
            </p>
            <div className="mt-4 flex justify-center space-x-8 opacity-50">
              {/* Add company logos here */}
              <img src="/logos/company1.svg" alt="Company 1" className="h-8" />
              <img src="/logos/company2.svg" alt="Company 2" className="h-8" />
              <img src="/logos/company3.svg" alt="Company 3" className="h-8" />
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default TestimonialSection;