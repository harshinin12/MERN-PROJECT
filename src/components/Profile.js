import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from localStorage after registration or login
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      // If no user is logged in, redirect to login page
      navigate("/login");
    }
  }, [navigate]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <div className="mb-2">
        <strong>Name:</strong> {user.name}
      </div>
      <div className="mb-2">
        <strong>Email:</strong> {user.email}
      </div>
      <div className="mb-2">
        <strong>Phone Number:</strong> {user.phone}
      </div>
      <div className="mb-2">
        <strong>User Mode:</strong> {user.userMode}
      </div>
      <div className="mb-2">
        <strong>Age:</strong> {user.age}
      </div>
      <div className="mb-2">
        <strong>Residency:</strong> {user.residency}
      </div>
      <div className="mb-2">
        <strong>Short Biography:</strong> {user.bio}
      </div>
      <button
        onClick={() => {
          localStorage.removeItem("userData");
          navigate("/login");
        }}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}

export default ProfilePage;
