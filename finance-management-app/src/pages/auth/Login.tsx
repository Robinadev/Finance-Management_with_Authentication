import { useState, FormEvent, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormErrors {
  email?: string;
  password?: string;
  submit?: string;
}

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = location.state?.success && location.state?.message;

  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        navigate('.', { state: {}, replace: true });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, navigate]);

  const validateForm = (): boolean => {
    const newErrors: LoginFormErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
  
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
  
    setIsLoading(true);
    setErrors({});
  
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email.toLowerCase().trim(),
          password: formData.password
        }),
        credentials: 'include'
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        if (data.status === 'error') {
          const newErrors: LoginFormErrors = {};
          if (data.details) {
            Object.entries(data.details).forEach(([key, value]) => {
              if (value) {
                newErrors[key as keyof LoginFormErrors] = value as string;
              }
            });
            setErrors(newErrors);
          }
          throw new Error(data.message);
        }
        throw new Error(data.message || 'Login failed');
      }
  
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/dashboard', { replace: true });
      } else {
        throw new Error('Authentication failed');
      }
      
    } catch (error) {
      console.error('Login error:', error);
      setErrors(prev => ({ 
        ...prev,
        submit: error instanceof Error ? error.message : 'Login failed'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      {successMessage && (
        <div className="mb-4 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="rounded-md bg-green-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">{successMessage}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {errors.submit && (
            <div className="mb-4 rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">{errors.submit}</p>
                </div>
              </div>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Don't have an account?{' '}
                  <Link to="/signup" className="font-medium text-teal-600 hover:text-teal-500">
                    Sign up
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;