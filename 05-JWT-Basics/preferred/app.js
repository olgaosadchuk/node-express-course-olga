const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
app.use(express.json());

const authRoutes = require('./routes/auth');
app.use('/api/v1', authRoutes);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));