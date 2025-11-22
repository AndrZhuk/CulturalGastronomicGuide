import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db.js';

import authRoutes from './backend/routes/authRoutes.js';
import userRoutes from './backend/routes/userRoutes.js';
import contentRoutes from './backend/routes/contentRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', authRoutes); // /api/users/register, /api/users/login
app.use('/api/users', userRoutes); // /api/users/:id, etc.
app.use('/api', contentRoutes);    // /api/establishments, etc.

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

