import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]); // State for bookings
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/auth/userData', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          fetchUserBookings(userData._id);
        } else {
          navigate('/login');
        }
      } catch (error) {
        navigate('/login');
      }
    };

    const fetchUserBookings = async (userId) => {
      try {
        const response = await fetch(`/api/bookings/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.ok) {
          const bookingsData = await response.json();
          setBookings(bookingsData);
        }
      } catch (error) {
        console.error('Failed to fetch bookings:', error.message);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const { name, email, phone, userMode, age, residency, bio } = user;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <div className="mb-2"><strong>Name:</strong> {name || 'N/A'}</div>
      <div className="mb-2"><strong>Email:</strong> {email || 'N/A'}</div>
      <div className="mb-2"><strong>Phone Number:</strong> {phone || 'N/A'}</div>
      <div className="mb-2"><strong>User Mode:</strong> {userMode || 'N/A'}</div>
      <div className="mb-2"><strong>Age:</strong> {age || 'N/A'}</div>
      <div className="mb-2"><strong>Residency:</strong> {residency || 'N/A'}</div>
      <div className="mb-2"><strong>Short Biography:</strong> {bio || 'N/A'}</div>

      {/* Render Bookings */}
      <h3 className="text-xl font-semibold mt-4">Your Bookings</h3>
      {bookings.length > 0 ? (
        <ul className="list-disc list-inside mt-2">
          {bookings.map((booking) => (
            <li key={booking._id}>
              <div><strong>First Name:</strong> {booking.firstName}</div>
              <div><strong>Last Name:</strong> {booking.lastName}</div>
              <div><strong>Email:</strong> {booking.email}</div>
              <div><strong>Room Type:</strong> {booking.roomType}</div>
              <div><strong>Guests:</strong> {booking.guests}</div>
              <div><strong>Arrival Date:</strong> {new Date(booking.arrivalDate).toLocaleDateString()}</div>
              <div><strong>Arrival Time:</strong> {booking.arrivalTime}</div>
              <div><strong>Departure Date:</strong> {new Date(booking.departureDate).toLocaleDateString()}</div>
              <div><strong>Pickup:</strong> {booking.pickup}</div>
              <div><strong>Special Requests:</strong> {booking.specialRequests || 'None'}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found.</p>
      )}

      <button
        onClick={() => {
          localStorage.removeItem('token');
          navigate('/login');
        }}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}

export default ProfilePage;
