const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Registration Route
router.post('/register', async (req, res) => {
  const { name, email, password, phone, userMode, age, residency, bio } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    phone,
    userMode,
    age,
    residency,
    bio,
  });

  await newUser.save();
  res.status(201).json({ message: 'User registered successfully',
    user: {
      id: newUser._id,  
      name: newUser.name,
      email: newUser.email,
    }
   });
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Check for user
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Create and return token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '12h' });
  res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
});

// Fetch User Data Route
router.get('/userData', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Get the token from the authorization header
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    const user = await User.findById(decoded.id).select('-password'); // Find user and exclude password

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user); // Return user data
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Await `Place` model
const placePromise = require('../models/Place');
(async () => {
  const Place = await placePromise;

  // Get all places
  router.get('/listings', async (req, res) => {
    try {
      const places = await Place.find();
      res.json(places);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching places', error });
    }
  });

  // Get a specific place by ID
  router.get('/listings/:id', async (req, res) => {
    try {
      const place = await Place.findById(req.params.id);
      if (!place) return res.status(404).json({ message: 'Place not found' });
      res.json(place);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching place', error });
    }
  });

  // Create a new place
  router.post('/listings', async (req, res) => {
    const { name, description, price, rating, location, amenities, image, details } = req.body;
    const newPlace = new Place({ name, description, price, rating, location, amenities, image, details });

    try {
      const savedPlace = await newPlace.save();
      res.status(201).json(savedPlace);
    } catch (error) {
      res.status(400).json({ message: 'Error creating place', error });
    }
  });
})();
module.exports = router;
