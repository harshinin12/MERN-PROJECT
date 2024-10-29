import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Import your AuthContext
import { useNavigate } from 'react-router-dom';

function LoginModal({ onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); // Get the login function from AuthContext
  const navigate = useNavigate(); // Use navigate to redirect after login

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password }); // Call the login function from AuthContext
      alert("Logged in successfully");
      onClose(); // Close the modal after successful login
      navigate('/profile'); // Redirect to the profile page or another page after login
    } catch (error) {
      console.error("Login error:", error.response?.data?.message || error.message);
      alert("Login failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Login
            </button>
            <button 
              type="button" 
              onClick={onClose} 
              className="text-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
