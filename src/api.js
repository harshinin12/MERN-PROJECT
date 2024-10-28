// client/src/api/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Base URL for your backend
});

export const registerUser = (userData) => API.post('/auth/register', userData);

export const loginUser = async ({ email, password }) => {
  const response = await axios.post('/api/auth/login', { email, password });
  const { token } = response.data;

  // Save the token to local storage
  localStorage.setItem('token', token);

  return response; // Return the full response to handle success messages
};

