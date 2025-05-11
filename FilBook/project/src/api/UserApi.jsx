// Integrate Axios with Spring Boot Backend
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/users';

// Axios instance with default configurations
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
// User Registration
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/add', userData);
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};

// User Login
export const loginUser = async (loginData) => {
  try {
    const response = await api.post('/login', loginData);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

// Fetch All Users
export const fetchUsers = async () => {
  try {
    const response = await api.get('/all');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
