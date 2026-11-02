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

## Task 2: Add New Book (POST /books)

Accepts book details in the request body, validates required fields and quantity/availability values, prevents duplicate book IDs, saves the book, and returns a success response.

### Endpoint:
- **Method:** `POST`
- **URL:** `/books`, `/api/books`

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
- **URL:** `/api/books` (also `/books`)
- **Success Response (`200 OK`):** Returns array of all books.

### 2. Retrieve Book by ID
- **Method:** `GET`
- **URL:** `/api/books/:id` (also `/books/:id`)
- **Success Response (`200 OK`):** Returns the matched book object.
- **Error Response (`404 Not Found`):** If book does not exist.

---

## Task 4: Update and Delete Book Details

### 1. Update Book Details
- **Method:** `PUT`
- **URL:** `/api/books/:id` (also `/books/:id`)
- **Rules:**
  - Finds the book using the URL ID.
  - Updates formatted book details using request body.
  - **Does not allow book ID to be changed** (returns `400 Bad Request` if changed).
  - Returns `404 Not Found` if the book does not exist.
  - Validates `quantity` and `availability` (`availability <= quantity`).

#### Success Response (`200 OK`):
```json
{
  "message": "Book updated successfully",
  "book": {
    "id": 101,
    "title": "Java Programming 12th Edition",
    "author": "Herbert Schildt",
    "category": "Programming",
    "quantity": 8,
    "availability": 8
  }
}
```

### 2. Delete a Book
- **Method:** `DELETE`
- **URL:** `/api/books/:id` (also `/books/:id`)
- **Rules:**
  - Finds and deletes the specified book.
  - **Conditional Deletion:** Does not delete a book when `available < quantity` (copies currently borrowed/issued), returning `400 Bad Request`.
  - Returns `404 Not Found` if the book does not exist.
  - Returns available, success, and deleted book details upon deletion.

#### Success Response (`200 OK`):
```json
{
  "message": "Book deleted successfully",
  "available": 5,
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

#### Error Response when copies are borrowed (`400 Bad Request`):
```json
{
  "error": "Cannot delete book: available is less than quantity",
  "available": 3,
  "quantity": 5
}
```

---

## Running the Project

```bash
npm install
npm start
```
