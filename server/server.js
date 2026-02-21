require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const customerRoutes = require('./routes/customerRoutes');
const errorHandler = require('./middleware/errorHandler');

// Initialize app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}));

// Routes
app.use('/api/customers', customerRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 API Documentation:`);
  console.log(`   GET    http://localhost:${PORT}/api/customers`);
  console.log(`   GET    http://localhost:${PORT}/api/customers/:id`);
  console.log(`   POST   http://localhost:${PORT}/api/customers`);
  console.log(`   PUT    http://localhost:${PORT}/api/customers/:id`);
  console.log(`   DELETE http://localhost:${PORT}/api/customers/:id`);
  console.log(`   GET    http://localhost:${PORT}/api/customers/search?query=name\n`);
});
