import React, { useState, useEffect } from 'react';
import { User, Mail, Calendar, Edit2, Save, LogOut } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const ProfilePage = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    createdAt: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { logout } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserData(response.data);
    } catch (error) {
      setError('Failed to fetch user data');
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
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:3000/api/users/profile', userData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      setError('Failed to update profile');
    }
  };

  const handleLogout = () => {
    console.log('here');
    logout();
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <div className="bg-gray-900 flex flex-col justify-center items-center px-24 py-14">
      <main className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-white text-center mb-8">User Profile</h2>
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          {error && (
            <div className="mb-4 p-2 bg-red-500 text-white rounded">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-2 bg-green-500 text-white rounded">
              {success}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="username">
                Username
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
                  value={userData.username}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>
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
                  value={userData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="createdAt">
                Member Since
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Calendar className="h-5 w-5 text-gray-500" />
                </span>
                <input
                  className="w-full bg-gray-700 text-white rounded pl-10 p-2"
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
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
                type="submit"
              >
                <Save className="inline mr-2" size={18} />
                Save Changes
              </button>
            ) : (
              <button
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
                type="button"
                onClick={() => setIsEditing(true)}
              >
                <Edit2 className="inline mr-2" size={18} />
                Edit Profile
              </button>
            )}
          </form>
          <button
            className="w-full bg-red-600 hover:bg-red-700 text-white mt-6 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleLogout}
          >
            <LogOut className="inline mr-2" size={18} />
            Log Out
          </button>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;