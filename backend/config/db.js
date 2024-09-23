const mongoose = require('mongoose');

const uri = "mongodb+srv://admin:admin@cluster0.drzuv.mongodb.net/agiprompt?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    await mongoose.connect(uri || 'mongodb://localhost:27017/myapp');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;