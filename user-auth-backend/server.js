const express = require('express');
const cors = require('cors');
const {connectDB1, connectDB2} = require('./config/db');
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookroute');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
