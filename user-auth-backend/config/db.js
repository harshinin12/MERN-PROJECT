const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB1 = async () => {
  try {
    const conn = await mongoose.createConnection(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // 5 seconds to find server
      connectTimeoutMS: 10000 // 10 seconds for initial connection
    });
    console.log('Main MongoDB connected');
    return conn;
  } catch (error) {
    console.error('Main MongoDB connection failed:', error.message);
    process.exit(1); // Exit process with failure
  }
};

const connectDB2 = async () => {
  try {
    const conn = await mongoose.createConnection(process.env.MONGO_URI2, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000
    });
    console.log('Listings MongoDB connected');
    return conn;
  } catch (error) {
    console.error('Listings MongoDB connection failed:', error.message);
    process.exit(1); // Exit process with failure
  }
};


module.exports = { connectDB1, connectDB2 };
