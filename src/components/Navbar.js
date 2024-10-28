import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import Login from './Login';
import Register from './Register';

function Navbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-500">Welcome!Find your stay</Link>
        <ul className="flex space-x-6">
        <li>
            <Link to="/" className="text-blue-600">Home</Link> {/* Home Tab */}
          </li>
          <li>
            <button className="text-blue-600" onClick={() => setShowLogin(true)}>Login</button>
          </li>
          <li>
            <button className="text-blue-600" onClick={() => setShowRegister(true)}>Register</button>
          </li>
          {/* Profile Link */}
          <li>
            <Link className='text-blue-600' to="/listings">Site Listings</Link>
          </li>
          <li>
            <Link to="/profile" className="text-blue-600">Profile</Link>
          </li>
        </ul>
      </div>

      {/* Modals */}
      {showLogin && <Login onClose={() => setShowLogin(false)} />}
      {showRegister && <Register onClose={() => setShowRegister(false)} />}
    </nav>
  );
}

export default Navbar;
