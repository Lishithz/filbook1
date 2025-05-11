import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { API_URL } from '../config/constants';

// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (token) {
          // Validate token and check expiration
          try {
            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            
            if (decoded.exp < currentTime) {
              // Token expired
              localStorage.removeItem('token');
              setUser(null);
            } else {
              // Set axios default header
              axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
              
              // Get user profile
              const response = await axios.get(`${API_URL}/api/users/me`);
              setUser(response.data);
            }
          } catch (err) {
            // Invalid token
            localStorage.removeItem('token');
            setUser(null);
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    initAuth();
  }, []);
  
  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const storedUser = JSON.parse(localStorage.getItem('mockUser'));
      if (storedUser && storedUser.email === email && storedUser.password === password) {
        // Simulate setting a mock token
        const mockToken = 'mocked-jwt-token';
        localStorage.setItem('token', mockToken);
        
        // Set mock user
        setUser({ email: storedUser.email, name: storedUser.name || "Mock User" });
        return { success: true };
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };
  
  // Register function
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);

      // Save user data to localStorage
      localStorage.setItem('mockUser', JSON.stringify({
        email: userData.email,
        password: userData.password,
        name: userData.name || "Mock User"
      }));

      return { success: true };
    } catch (err) {
      setError('Registration failed.');
      return { success: false, error: 'Registration failed.' };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  // Update user profile
  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.put(`${API_URL}/api/users/profile`, profileData);
      setUser({ ...user, ...response.data });
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile. Please try again.');
      return { success: false, error: err.response?.data?.message || 'Failed to update profile. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  // Context value
  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
