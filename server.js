const express = require('express');

// Task 1: Initialize Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory data store for books
let books = [];

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

// Task 2: Add new book POST API
const addBookHandler = (req, res) => {
  const {
    id, iD, ID, bookId,
    title, Title,
    author, Author,
    category, Category,
    quantity, Quantity,
    availability, Availability
  } = req.body;

  const resolvedId = id ?? iD ?? ID ?? bookId;
  const resolvedTitle = title ?? Title;
  const resolvedAuthor = author ?? Author;
  const resolvedCategory = category ?? Category;
  const resolvedQuantity = quantity ?? Quantity;
  const resolvedAvailability = availability ?? Availability;

  // Validate required fields
  if (
    resolvedId === undefined || resolvedId === null || resolvedId === '' ||
    !resolvedTitle ||
    !resolvedAuthor ||
    !resolvedCategory ||
    resolvedQuantity === undefined || resolvedQuantity === null || resolvedQuantity === '' ||
    resolvedAvailability === undefined || resolvedAvailability === null || resolvedAvailability === ''
  ) {
    return res.status(400).json({
      error: 'All fields (id, title, author, category, quantity, availability) are required'
    });
  }

  // Validate quantity and availability values
  const numQuantity = Number(resolvedQuantity);
  const numAvailability = Number(resolvedAvailability);

  if (isNaN(numQuantity) || numQuantity < 0) {
    return res.status(400).json({
      error: 'Quantity must be a valid non-negative number'
    });
  }

  if (isNaN(numAvailability) || numAvailability < 0) {
    return res.status(400).json({
      error: 'Availability must be a valid non-negative number'
    });
  }

  if (numAvailability > numQuantity) {
    return res.status(400).json({
      error: 'Availability cannot exceed total quantity'
    });
  }

  // Prevent duplicate book IDs
  const isDuplicate = books.some(book => String(book.id) === String(resolvedId));
  if (isDuplicate) {
    return res.status(409).json({
      error: `Book with ID ${resolvedId} already exists`
    });
  }

  // Create book object
  const newBook = {
    id: isNaN(Number(resolvedId)) ? resolvedId : Number(resolvedId),
    title: String(resolvedTitle).trim(),
    author: String(resolvedAuthor).trim(),
    category: String(resolvedCategory).trim(),
    quantity: numQuantity,
    availability: numAvailability
  };

  // Save the book
  books.push(newBook);

  // Return success response
  return res.status(201).json({
    message: 'Book added successfully',
    book: newBook
  });
};

// Register POST book route across standard endpoints
app.post('/books', addBookHandler);
app.post('/api/books', addBookHandler);
app.post('/book', addBookHandler);

// GET route to view all books
app.get('/books', (req, res) => {
  res.status(200).json({
    count: books.length,
    books
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
