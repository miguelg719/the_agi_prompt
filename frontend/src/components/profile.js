import React, { useState, useEffect } from 'react';
import { User, Mail, Calendar, Edit2, Save, LogOut, Trash2, Loader2 } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getUserInfo } from '../utils/auth';
import { deletePrompt } from '../services/api';
import { API_URL } from '../api/config';

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    createdAt: '',
  });
  const [ userInfo, setUserInfo ] = useState(null);
  const [ userPrompts, setUserPrompts ] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ error, setError ] = useState('');
  const [ success, setSuccess ] = useState('');
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const info = getUserInfo();
      setUserInfo(info);
      if (info && info.userId) {
        try {
          await fetchUserData();
          await fetchUserPrompts(info.userId);
        } catch (error) {
          setError('Failed to load user data');
        }
      } else {
        // Redirect to login if no user info is available
        navigate('/login');
      }
      setIsLoading(false);
    };

    fetchData();
  }, [navigate]);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/users/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserData(response.data);
    } catch (error) {
      setError('Failed to fetch user data');
    }
  };

  const fetchUserPrompts = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/api/prompts/user/${userId}`);
      setUserPrompts(response.data);
    } catch (error) {
      setError('Failed to fetch user prompts');
    }
  };

  const handleDeletePrompt = async (promptId) => {
    try {
      await deletePrompt(promptId);
      setUserPrompts(userPrompts.filter(prompt => prompt._id !== promptId));
      setSuccess('Prompt deleted successfully');
    } catch (error) {
      setError('Failed to delete prompt');
    }
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // TODO: refactor 
      const token = localStorage.getItem('token');
      await axios.put(`${API_URL}/api/users/profile`, userData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      setError('Failed to update profile');
    }
  };

  const handleLogout = () => {
    logout();
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <p className="text-white text-xl">No user information available. Please log in.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center px-4 sm:px-6 md:px-24 py-8 md:py-14">
      <main className="w-full max-w-md">
        <h2 className="text-xl md:text-2xl font-bold text-white text-center mb-6 md:mb-8">User Profile</h2>
        <div className="bg-gray-800 p-4 md:p-8 rounded-lg shadow-lg">
          {error && (
            <div className="mb-4 p-2 bg-red-500 text-white text-sm rounded">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-2 bg-green-500 text-white text-sm rounded">
              {success}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="h-4 w-4 md:h-5 md:w-5 text-gray-500" />
                </span>
                <input
                  className="w-full bg-gray-700 text-white text-sm rounded pl-10 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="username"
                  name="username"
                  type="text"
                  value={userData.username}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-4 w-4 md:h-5 md:w-5 text-gray-500" />
                </span>
                <input
                  className="w-full bg-gray-700 text-white text-sm rounded pl-10 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="email"
                  name="email"
                  type="email"
                  value={userData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="createdAt">
                Member Since
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Calendar className="h-4 w-4 md:h-5 md:w-5 text-gray-500" />
                </span>
                <input
                  className="w-full bg-gray-700 text-white text-sm rounded pl-10 p-2"
                  id="createdAt"
                  name="createdAt"
                  type="text"
                  value={new Date(userData.createdAt).toLocaleDateString()}
                  disabled
                />
              </div>
            </div>

            {isEditing ? (
              <button
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm"
                type="submit"
              >
                <Save className="inline mr-2" size={16} />
                Save Changes
              </button>
            ) : (
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm"
                type="button"
                onClick={() => setIsEditing(true)}
              >
                <Edit2 className="inline mr-2" size={16} />
                Edit Profile
              </button>
            )}
          </form>
          
          <button
            className="w-full bg-red-600 hover:bg-red-700 text-white mt-4 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm"
            onClick={handleLogout}
          >
            <LogOut className="inline mr-2" size={16} />
            Log Out
          </button>
        </div>
      </main>

      <section className="w-full max-w-3xl mt-8">
        <h2 className="text-lg md:text-xl font-bold text-white mb-4 text-center">Your Prompts</h2>
        <div className="space-y-3">
          {userPrompts.map((prompt) => (
            <div key={prompt._id} className="bg-gray-700 p-3 md:p-4 rounded-lg shadow flex flex-col sm:flex-row gap-3 sm:gap-0 sm:items-center">
              <div className="flex-grow">
                <Link to={`/prompt/${prompt._id}`} className="text-sm md:text-lg font-semibold text-white hover:text-blue-400">
                  {prompt.title}
                </Link>
              </div>
              <div className="flex gap-2 justify-end">
                <button className="bg-blue-500 hover:bg-blue-600 text-white p-1.5 rounded-md transition-colors duration-300">
                  <Edit2 size={16} />
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-md transition-colors duration-300"
                  onClick={() => handleDeletePrompt(prompt._id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          {userPrompts.length === 0 && (
            <p className="text-gray-400 text-center text-sm">You haven't created any prompts yet.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;