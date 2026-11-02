const express = require('express');

// Task 1: Initialize Express application
const app = express();

// Default configuration port: 3000
const PORT = process.env.PORT || 3000;

// Configure Express JSON middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Express application initialized successfully',
    student: {
      name: 'Akshat Vats',
      rollNo: '2500320100144',
      section: 'CSE-11'
    },
    port: PORT
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
