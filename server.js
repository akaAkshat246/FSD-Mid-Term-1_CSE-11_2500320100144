const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let books = [];
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
  const isDuplicate = books.some(book => String(book.id) === String(resolvedId));
  if (isDuplicate) {
    return res.status(409).json({
      error: `Book with ID ${resolvedId} already exists`
    });
  }
  const newBook = {
    id: isNaN(Number(resolvedId)) ? resolvedId : Number(resolvedId),
    title: String(resolvedTitle).trim(),
    author: String(resolvedAuthor).trim(),
    category: String(resolvedCategory).trim(),
    quantity: numQuantity,
    availability: numAvailability
  };
  books.push(newBook);
  return res.status(201).json({
    message: 'Book added successfully',
    book: newBook
  });
};
app.post('/books', addBookHandler);
app.post('/api/books', addBookHandler);
app.post('/book', addBookHandler);
// Task 3: Retrieve books
const getAllBooksHandler = (req, res) => {
  return res.status(200).json(books);
};

const getBookByIdHandler = (req, res) => {
  const { id } = req.params;
  const trimmedId = id ? String(id).trim() : '';

  if (!trimmedId) {
    return res.status(400).json({
      error: 'Book id parameter is required'
    });
  }

  const book = books.find(b => String(b.id) === trimmedId);
  if (!book) {
    return res.status(404).json({
      message: 'Book not found',
      error: `No book found with id ${trimmedId}`
    });
  }
  return res.status(200).json(book);
};

app.get('/api/books', getAllBooksHandler);
app.get('/books', getAllBooksHandler);
app.get('/api/books/:id', getBookByIdHandler);
app.get('/books/:id', getBookByIdHandler);

// Task 4: Update book details
const updateBookHandler = (req, res) => {
  const { id } = req.params;
  const trimmedId = id ? String(id).trim() : '';

  const bookIndex = books.findIndex(b => String(b.id) === trimmedId);
  if (bookIndex === -1) {
    return res.status(404).json({
      message: 'Book not found',
      error: `No book found with id ${trimmedId}`
    });
  }

  const existingBook = books[bookIndex];
  const { title, Title, author, Author, category, Category, quantity, Quantity, availability, Availability } = req.body;

  existingBook.title = title ?? Title ?? existingBook.title;
  existingBook.author = author ?? Author ?? existingBook.author;
  existingBook.category = category ?? Category ?? existingBook.category;

  if (quantity !== undefined || Quantity !== undefined) {
    existingBook.quantity = Number(quantity ?? Quantity);
  }
  if (availability !== undefined || Availability !== undefined) {
    existingBook.availability = Number(availability ?? Availability);
  }

  return res.status(200).json({
    message: 'Book updated successfully',
    book: existingBook
  });
};

app.put('/api/books/:id', updateBookHandler);
app.put('/books/:id', updateBookHandler);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
module.exports = app;