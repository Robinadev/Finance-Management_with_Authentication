import { Link } from 'react-router-dom';
import image from '../assets/logo.jpg';
const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0">
              <img className="h-8 w-8" src={image} alt="Logo" />
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a href="#" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium">
                Home
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium">
                Features
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium">
                Pricing
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium">
                Contact
              </a>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
        
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700">
            <Link 
            to="/login"
            className="px-4 py-2 rounded-md hover:bg-teal-700 transition-colors duration-200"
            >
            Sign in
            </Link>
             </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
{/* <Link 
to="/login"
className="px-4 py-2 rounded-md hover:bg-teal-700 transition-colors duration-200"
>
Login
</Link> */}