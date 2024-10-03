import axios from 'axios';
import { getAuthHeader } from '../utils/auth';

const API_URL = 'http://localhost:3000/api';

export const loginUser = async (username, password) => {
  const response = await axios.post(`${API_URL}/users/login`, { username, password });
  return response.data;
};

export const registerUser = async (username, email, password) => {
  const response = await axios.post(`${API_URL}/users/register`, { username, email, password });
  return response.data;
};

export const getUserProfile = async (token) => {
  const response = await axios.get(`${API_URL}/users/profile`, {
    headers: { ...getAuthHeader() }
  });
  return response.data;
};

export const fetchPromptById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/prompts/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching prompt by id:', error);
      throw error;
    }
  };