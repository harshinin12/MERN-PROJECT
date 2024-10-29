import React, { useState } from 'react';
import './Booking.css';
import { useAuth } from '../context/AuthContext'; // Adjust path if necessary

function Booking() {
  const { isAuthenticated, user } = useAuth(); // Access the Auth context and user information
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    roomType: '',
    guests: '',
    arrivalDate: '',
    arrivalTime: '',
    departureDate: '',
    pickup: '',
    specialRequests: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      console.log("User data: ",user);
      // Include userId in the booking request
      const bookingData = {
        ...formData,
        userId: user.id, // Assuming user.id contains the user's ID
      };

      console.log('Booking Data:', bookingData);

      try {
        const response = await fetch('http://localhost:5000/api/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Send the token for authentication
          },
          body: JSON.stringify(bookingData),
        });

        if (response.ok) {
          alert("Booked successfully!");
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            roomType: '',
            guests: '',
            arrivalDate: '',
            arrivalTime: '',
            departureDate: '',
            pickup: '',
            specialRequests: '',
          });
        } else {
          alert("Failed to book.");
        }
      } catch (error) {
        console.error('Error:', error);
        alert("An error occurred. Please try again.");
      }
    } else {
      alert("Please log in to book a room.");
    }
  };

  return (
    <div className="booking-container">
      <h1>Hotel Booking</h1>
      <p>Experience something new every moment</p>

      <form className="booking-form" onSubmit={handleSubmit}>
        <div className="input-group full-width">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group full-width">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group full-width">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="ex: myname@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="roomType">Room Type</label>
          <select
            name="roomType"
            id="roomType"
            value={formData.roomType}
            onChange={handleChange}
            required
          >
            <option value="">Please Select Room Type</option>
            <option value="single">Single Room</option>
            <option value="double">Double Room</option>
            <option value="suite">Suite</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="guests">Number of Guests</label>
          <input
            type="number"
            name="guests"
            id="guests"
            placeholder="Number of Guests"
            value={formData.guests}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="arrivalDate">Arrival Date</label>
          <input
            type="date"
            name="arrivalDate"
            id="arrivalDate"
            value={formData.arrivalDate}
            onChange={handleChange}
            required
          />

          <label htmlFor="arrivalTime">Arrival Time</label>
          <input
            type="time"
            name="arrivalTime"
            id="arrivalTime"
            value={formData.arrivalTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="departureDate">Departure Date</label>
          <input
            type="date"
            name="departureDate"
            id="departureDate"
            value={formData.departureDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Free Pickup?</label>
          <div className="radio-group">
            <input
              type="radio"
              name="pickup"
              value="yes"
              id="pickupYes"
              onChange={handleChange}
              required
            />
            <label htmlFor="pickupYes">Yes Please!</label>

            <input
              type="radio"
              name="pickup"
              value="no"
              id="pickupNo"
              onChange={handleChange}
              required
            />
            <label htmlFor="pickupNo">No Thanks</label>
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="specialRequests">Special Requests</label>
          <textarea
            name="specialRequests"
            id="specialRequests"
            placeholder="Any special requests?"
            value={formData.specialRequests}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Booking;
