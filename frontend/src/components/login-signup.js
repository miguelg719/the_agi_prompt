import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { User, Lock, Mail, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const LoginSignup = () => {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  useEffect(() => {
    if (redirectToLogin) {
      const timer = setTimeout(() => {
        setIsLogin(true);
        setSuccess(false);
        setRedirectToLogin(false);
        clearForm();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [redirectToLogin]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const clearForm = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      if (isLogin) {
        const response = await axios.post('http://localhost:3000/api/users/login', {
          username: formData.username,
          password: formData.password
        });
        setSuccess(true);
        login(response.data.token);
        console.log('Login successful:', response.data);

        setTimeout(() => {
          navigate('/profile');
        }, 1000);
      } else {
        const response = await axios.post('http://localhost:3000/api/users/register', formData);
        setSuccess(true);
        setRedirectToLogin(true);
        console.log('Registration successful:', response.data);
      }
      clearForm();
    } catch (error) {
      setSuccess(false);
      if (error.response) {
        setError(error.response.data.message || 'Something went wrong!');
      } else {
        setError('Server error!');
      }
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setSuccess(false);
    setError('');
    clearForm();
  };

  return (
    <div className="bg-gray-900 flex flex-col justify-center items-center p-4 sm:p-6 md:p-8 lg:p-24 min-h-screen">
      <main className="w-full max-w-md">
        <h2 className="text-xl sm:text-2xl font-bold text-white text-center mb-4 sm:mb-8">
          {isLogin ? 'Log In' : 'Sign Up'}
        </h2>
        <div className="bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg shadow-lg">
          {success && (
            <div className="mb-4 p-2 bg-green-500 text-white rounded flex items-center text-sm">
              <CheckCircle className="mr-2 h-4 w-4" />
              <span>{isLogin ? 'Login successful!' : 'User registered! Redirecting...'}</span>
            </div>
          )}
          {error && (
            <div className="mb-4 p-2 bg-red-500 text-white rounded text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="username">
                {isLogin ? "Username / Email" : "Username" } 
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="h-5 w-5 text-gray-500" />
                </span>
                <input
                  className="w-full bg-gray-700 text-white rounded pl-10 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder={isLogin ? "Username or email" : "Username"}
                  required
                />
              </div>
            </div>
            {!isLogin && (
              <div>
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Mail className="h-5 w-5 text-gray-500" />
                  </span>
                  <input
                    className="w-full bg-gray-700 text-white rounded pl-10 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                  />
                </div>
              </div>
            )}
            <div>
              <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-gray-500" />
                </span>
                <input
                  className="w-full bg-gray-700 text-white rounded pl-10 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                />
              </div>
            </div>
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm"
              type="submit"
            >
              {isLogin ? 'Log In' : 'Sign Up'}
            </button>
          </form>
          <div className="mt-4">
            <p className="text-center text-gray-400 text-sm">
              Or continue with
            </p>
            <div className="flex justify-center mt-2 space-x-4">
              <button className="text-gray-400 hover:text-white">
                <FontAwesomeIcon icon={faDiscord} size="lg" />
              </button>
              <button className="text-gray-400 hover:text-white">
                <FontAwesomeIcon icon={faGoogle} size="lg" />
              </button>
            </div>
          </div>
        </div>
        {!redirectToLogin && (
          <p className="text-center text-gray-400 mt-4 text-sm">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              className="text-blue-500 hover:text-blue-400"
              onClick={toggleMode}
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        )}
      </main>
    </div>
  );
};

export default LoginSignup;