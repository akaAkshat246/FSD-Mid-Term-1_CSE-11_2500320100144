# FSD Mid-Term 1

**Name:** Akshat Vats  
**Roll No / Student ID:** 2500320100144  
**Section:** CSE-11  
**Course:** Full Stack Development (FSD)  

---

## Folder Structure

```text
Mid-Term 1/
|-package.json
|-package-lock.json
|-server.js
|-readme.md
|-.gitignore
```

---

## Task 1: Initialize the Express Application

- Project initialized with `npm init`.
- Express JS installed and configured.
- Default port: `3000`.
- Configured Express JSON middleware (`app.use(express.json())`).

---

## Task 2: Add New Book (POST /api/books)

Accepts book details in the request body, validates required fields and quantity/availability values, prevents duplicate book IDs, saves the book, and returns a success response.

### Endpoint:
- **Method:** `POST`
- **URL:** `/api/books`

### Request Body Example:
```json
{
  "id": 101,
  "title": "Java Programming",
  "author": "Herbert Schildt",
  "category": "Programming",
  "quantity": 5,
  "availability": 5
}
```

### Success Response (`201 Created`):
```json
{
  "message": "Book added successfully",
  "book": {
    "id": 101,
    "title": "Java Programming",
    "author": "Herbert Schildt",
    "category": "Programming",
    "quantity": 5,
    "availability": 5
  }
}
```

---

## Task 3: Retrieve Books

### 1. Retrieve All Books
- **Method:** `GET`
- **URL:** `/api/books`
- **Success Response (`200 OK`):** Returns array of all books.

### 2. Retrieve Book by ID
- **Method:** `GET`
- **URL:** `/api/books/:id`
- **Success Response (`200 OK`):** Returns the matched book object.
- **Error Response (`404 Not Found`):** If book does not exist.

---

## Task 4: Update and Delete Book Details

### 1. Update Book Details
- **Method:** `PUT`
- **URL:** `/api/books/:id`
- **Rules:**
  - Updates formatted book details.
  - **Does not allow book ID to be changed** (`400 Bad Request`).
  - Returns `404 Not Found` if book does not exist.

### 2. Delete a Book
- **Method:** `DELETE`
- **URL:** `/api/books/:id`
- **Rules:**
  - Deletes the specified book.
  - **Conditional Deletion:** Cannot delete if `available < quantity` (`400 Bad Request`).
  - Returns `404 Not Found` if book does not exist.

---

## Task 6: Search Books by Title

Search books using the `title` query parameter or path format with case-insensitive matching.

### Endpoint:
- **Method:** `GET`
- **URL:** `/api/books/search?title=java` (also `/api/books/search/title=java`)

### Success Response (`200 OK`):
```json
[
  {
    "id": 101,
    "title": "Java Programming",
    "author": "Herbert Schildt",
    "category": "Programming",
    "quantity": 5,
    "availability": 5
  }
]
```

### Not Found Response (`404 Not Found`):
```json
{
  "message": "No books found matching search criteria"
}
```

---

## Running the Project

```bash
npm install
npm start
```
