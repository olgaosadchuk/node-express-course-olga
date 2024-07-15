
require('dotenv').config(); // Ensure dotenv is loaded first
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// Middleware
app.use(express.static('./public'));
app.use(express.json());

// Routes
app.use('/api/v1/tasks', tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    const mongoURI = process.env.MONGO_URI; // Extract the URI from environment variables
    console.log('Connecting to MongoDB:', mongoURI); // Log the URI
    await connectDB(mongoURI);
    app.listen(port, () => console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log('Error connecting to MongoDB:', error.message);
  }
};

start();

