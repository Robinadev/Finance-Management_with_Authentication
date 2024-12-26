import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="py-16 bg-teal-600 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <h2 className="text-4xl font-bold">
            Ready to Start Your Financial Journey?
          </h2>
          <p className="text-lg">
            Join thousands of users who are already managing their finances smarter.
          </p>
          <Link 
            to="/signup"
            className="inline-block px-8 py-3 bg-white text-teal-600 rounded-md hover:bg-gray-100 transition-colors duration-200"
          >
            Sign Up Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;