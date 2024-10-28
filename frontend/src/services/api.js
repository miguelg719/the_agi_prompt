import axios from 'axios';
import { getAuthHeader } from '../utils/auth';
import { API_URL } from '../api/config';

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

export const createPrompt = async (promptData) => {
  try {
      const response = await axios.post(`${API_URL}/prompts`, promptData);
      return response.data;
  } catch (error) {
      console.error('Error creating prompt:', error);
      throw error;
  }
};

export const updatePrompt = async (id, promptData) => {
  try {
    const response = await axios.put(`${API_URL}/prompts/${id}`, promptData, {
      headers: { ...getAuthHeader() }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating prompt:', error);
    throw error;
  }
};

export const deletePrompt = async (id) => {
  try {
      const response = await axios.delete(`${API_URL}/prompts/${id}`);
      return response.data;
  } catch (error) {
      console.error('Error deleting prompt:', error);
      throw error;
  }
};

export const fetchComments = async (commentList) => {
  try {
    const queryString = commentList.map(id => `ids[]=${id}`).join('&');
    const response = await axios.get(`${API_URL}/comments/?${queryString}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch comments');
  }
};

export const createComment = async (promptId, userId, body) => {
  try {
    const response = await axios.post(`${API_URL}/comments`, {
      prompt: promptId,
      user: userId,
      body
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to create comment');
  }
};

export const updateComment = async (id, commentData) => {
  try {
    const response = await axios.put(`${API_URL}/comments/${id}`, commentData, {
      headers: { ...getAuthHeader() }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating prompt:', error);
    throw error;
  }
  };