const express = require('express');
const Booking = require('../models/Book'); // Ensure this is the correct path to your Booking model
const jwt = require('jsonwebtoken'); // Import jwt for token verification

const router = express.Router();

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Get the token from the authorization header
  if (!token) return res.status(401).json({ message: 'Unauthorized: No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });
    req.user = user; // Save user information for later use
    next();
  });
};

// Create a new booking
router.post('/', authenticateToken, async (req, res) => {
  const userId = req.user.id; // Get userId from the authenticated user

  const newBooking = new Booking({
    ...req.body, // Spread the request body
    userId: userId, // Add the userId to the booking
  });

  try {
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get bookings by user ID
router.get('/user/:userId', authenticateToken, async (req, res) => {
  const userId = req.params.userId;

  try {
    const bookings = await Booking.find({ userId: userId }); // Fetch bookings for the specific user
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings' });
  }
});

module.exports = router;
