import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Function to log in a user
  const login = async (credentials) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token); // Store the token
      setUser(data.user); // Set user details if data.user exists
      setIsAuthenticated(true);
    } else {
      console.error('Login failed:', response.statusText);
    }
  };

  // Function to log out a user
  const logout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    setUser(null); // Clear the user data
    setIsAuthenticated(false); // Update authentication state
  };

  // Function to check if a user is already logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch user details if necessary
      const fetchUserDetails = async () => {
        const response = await fetch('/api/auth/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user); // Assuming the server returns user details
          setIsAuthenticated(true);
        } else {
          console.error('Failed to fetch user details');
          logout(); // Clear session if token is invalid
        }
      };

      fetchUserDetails();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
