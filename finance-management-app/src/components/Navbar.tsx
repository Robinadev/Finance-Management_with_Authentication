import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-teal-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="text-2xl font-bold">
            Finance Management
          </Link>
          <div className="flex items-center space-x-4">
            <Link 
              to="/login"
              className="px-4 py-2 rounded-md hover:bg-teal-700 transition-colors duration-200"
            >
              Login
            </Link>
            <Link 
              to="/signup"
              className="px-4 py-2 bg-white text-teal-600 rounded-md hover:bg-gray-100 transition-colors duration-200"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;