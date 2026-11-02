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
- **URL:** `/books` (also available on `/api/books`, `/book`)

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

### Validation & Error Handling:
- Missing required fields: Returns `400 Bad Request`
- Invalid quantity or availability (< 0 or availability > quantity): Returns `400 Bad Request`
- Duplicate book ID: Returns `409 Conflict`

---

## Running the Project

```bash
npm install
npm start
```
