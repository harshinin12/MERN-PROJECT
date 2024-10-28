import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api';

function RegisterModal({ onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [userMode, setUserMode] = useState('Guest');
  const [age, setAge] = useState('');
  const [residency, setResidency] = useState('');
  const [bio, setBio] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser({
        name,
        email,
        password,
        phone,
        userMode,
        age,
        residency,
        bio,
      });
      alert("Registered successfully:", response.data);
      const user = response.data; // Assuming response contains user data
      
      // Close the modal
      onClose();
      localStorage.setItem("userData", JSON.stringify(user));

      // After receiving user data, navigate with it
      navigate("/profile");
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
        <h2 className="text-2xl font-bold mb-1">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-1">
            <label className="block mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-1 border rounded"
              required
            />
          </div>
          <div className="mb-1">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-1 border rounded"
              required
            />
          </div>
          <div className="mb-1">
            <label className="block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-1 border rounded"
              required
            />
          </div>
          <div className="mb-1">
            <label className="block mb-1">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-1 border rounded"
              required
            />
          </div>
          <div className="mb-1">
            <label className="block mb-1">User Mode</label>
            <select
              value={userMode}
              onChange={(e) => setUserMode(e.target.value)}
              className="w-full p-1 border rounded"
            >
              <option value="Guest">Guest</option>
              <option value="User">User</option>
            </select>
          </div>
          <div className="mb-1">
            <label className="block mb-1">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full p-1 border rounded"
              required
            />
          </div>
          <div className="mb-1">
            <label className="block mb-1">Residency</label>
            <input
              type="text"
              value={residency}
              onChange={(e) => setResidency(e.target.value)}
              className="w-full p-1 border rounded"
              required
            />
          </div>
          <div className="mb-1">
            <label className="block mb-1">Short Biography</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-1 border rounded"
              required
            />
          </div>
          <div className="flex justify-between items-center mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Register
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

export default RegisterModal;