import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { User, Lock, Mail, CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';
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
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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

  const validatePassword = (password) => {
    if (isLogin) return ''; // Skip validation for login

    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);

    if (password.length < minLength) {
      return 'Password must be at least 8 characters long';
    }
    if (!hasUpperCase || !hasLowerCase) {
      return 'Password must contain both uppercase and lowercase letters';
    }
    if (!hasNumber) {
      return 'Password must contain at least one number';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'password' && !isLogin) {
      setPasswordError(validatePassword(value));
    }
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

    if (!isLogin && passwordError) {
      setError('Please fix the password issues before submitting.');
      return;
    }

    try {
      if (isLogin) {
        // Login logic
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
        // Registration logic
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-gray-900 flex flex-col justify-center items-center p-24">
      <main className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-white text-center mb-8">
          {isLogin ? 'Log In' : 'Sign Up'}
        </h2>
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          {success && (
            <div className="mb-4 p-2 bg-green-500 text-white rounded flex items-center">
              <CheckCircle className="mr-2" />
              <span>{isLogin ? 'Login successful!' : 'User successfully registered! Redirecting...'}</span>
            </div>
          )}
          {error && (
            <div className="mb-4 p-2 bg-red-500 text-white rounded">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="username">
                {isLogin ? "Username / Email" : "Username" } 
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="h-5 w-5 text-gray-500" />
                </span>
                <input
                  className="w-full bg-gray-700 text-white rounded pl-10 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder={isLogin ? "Enter your username or email" : "Enter your username"}
                  required
                />
              </div>
            </div>
            {!isLogin && (
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Mail className="h-5 w-5 text-gray-500" />
                  </span>
                  <input
                    className="w-full bg-gray-700 text-white rounded pl-10 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
            )}
            <div className="mb-6">
              <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-gray-500" />
                </span>
                <input
                  className={`w-full bg-gray-700 text-white rounded pl-10 pr-10 p-2 focus:outline-none focus:ring-2 ${
                    !isLogin && passwordError ? 'focus:ring-red-500' : 'focus:ring-blue-500'
                  }`}
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
              {!isLogin && passwordError && (
                <div className="mt-2 text-red-500 text-sm flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {passwordError}
                </div>
              )}
            </div>
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {isLogin ? 'Log In' : 'Sign Up'}
            </button>
          </form>
          <div className="mt-4">
            <p className="text-center text-gray-400">
              Or continue with
            </p>
            <div className="flex justify-center mt-2">
              <button className="mx-2 text-gray-400 hover:text-white">
                <FontAwesomeIcon icon={faDiscord} size="lg" />
              </button>
              <button className="mx-2 text-gray-400 hover:text-white">
                <FontAwesomeIcon icon={faGoogle} size="lg" />
              </button>
            </div>
          </div>
        </div>
        {!redirectToLogin && (
          <p className="text-center text-gray-400 mt-4">
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
