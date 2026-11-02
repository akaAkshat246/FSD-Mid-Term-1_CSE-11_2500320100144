const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let books = [];

// Task 1: Root route
app.get('/', (req, res) => {
  res.send('Library API is running');
});

// Task 2: Add new book
app.post('/api/books', (req, res) => {
  const { id, title, author, category, quantity, availability } = req.body;

  if (!id || !title || !author || !category || quantity === undefined || availability === undefined) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (quantity < 0 || availability < 0 || availability > quantity) {
    return res.status(400).json({ error: 'Invalid quantity or availability' });
  }

  if (books.some(b => b.id == id)) {
    return res.status(400).json({ error: 'Book ID already exists' });
  }

  const newBook = {
    id: Number(id),
    title,
    author,
    category,
    quantity: Number(quantity),
    availability: Number(availability)
  };

  books.push(newBook);
  res.status(201).json({ message: 'Book added successfully', book: newBook });
});

// Task 3: Retrieve all books
app.get('/api/books', (req, res) => {
  res.status(200).json(books);
});

// Task 6: Search books by title
const searchBooks = (title, res) => {
  const query = (title || '').toLowerCase();
  const results = books.filter(b => b.title.toLowerCase().includes(query));
  if (results.length === 0) {
    return res.status(404).json({ message: 'No books found matching search criteria' });
  }
  res.status(200).json(results);
};

app.get('/api/books/search', (req, res) => searchBooks(req.query.title, res));
app.get('/api/books/search/title=:title', (req, res) => searchBooks(req.params.title, res));

// Task 3: Retrieve book by ID
app.get('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id == req.params.id);
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }
  res.status(200).json(book);
});

// Task 4: Update book details
app.put('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id == req.params.id);
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  if (req.body.id && req.body.id != req.params.id) {
    return res.status(400).json({ error: 'Book ID cannot be changed' });
  }

  const { title, author, category, quantity, availability } = req.body;
  if (title) book.title = title;
  if (author) book.author = author;
  if (category) book.category = category;
  if (quantity !== undefined) book.quantity = Number(quantity);
  if (availability !== undefined) book.availability = Number(availability);

  res.status(200).json({ message: 'Book updated successfully', book });
});

// Task 4: Delete a book
app.delete('/api/books/:id', (req, res) => {
  const index = books.findIndex(b => b.id == req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }

  const book = books[index];
  if (book.availability < book.quantity) {
    return res.status(400).json({
      error: 'Cannot delete book: available is less than quantity',
      available: book.availability
    });
  }

  books.splice(index, 1);
  res.status(200).json({ message: 'Book deleted successfully', available: book.availability });
});

// Task 7: Issue a book
const issueBook = (req, res) => {
  const book = books.find(b => b.id == req.params.id);
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  if (book.availability <= 0) {
    return res.status(400).json({ error: 'Book is not available for issue' });
  }

  res.status(200).json({ message: 'Book is available', availability: book.availability });
};

app.post('/api/books/:id', issueBook);
app.post('/api/books/:id/issue', issueBook);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
