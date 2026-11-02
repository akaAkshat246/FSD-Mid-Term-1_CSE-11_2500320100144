const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to FSD Mid-Term 1 API',
    student: {
      name: 'Akshat Vats',
      rollNo: '2500320100144',
      section: 'CSE-11'
    },
    status: 'Server is running successfully'
  });
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', uptime: process.uptime() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
