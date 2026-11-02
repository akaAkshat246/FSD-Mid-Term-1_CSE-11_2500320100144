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

### Completed Requirements:
- **Project Initialization:** Initialized Node.js project using `npm init`.
- **Express JS Configuration:** Installed Express (`^5.3.0`) and imported it in `server.js`.
- **Port Configuration:** Server runs on default port `3000` (or `process.env.PORT`).
- **Middleware:** Configured Express JSON middleware via `app.use(express.json())`.

### How to Run:
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm start
   ```
   Or with watch mode:
   ```bash
   npm run dev
   ```
3. Test the server:
   ```bash
   curl http://localhost:3000/
   ```
