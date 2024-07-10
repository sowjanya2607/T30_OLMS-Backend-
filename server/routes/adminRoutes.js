const express = require("express");
const router = express.Router();
const Admin = require("../models/admin"); // Assuming your Admin model is defined in admin.js
const Book = require("../models/Book"); // Assuming your Book model is defined in book.js
const bcrypt = require("bcryptjs");

// Admin Login
router.post("/login", async (req, res) => {
  const { adminId, password } = req.body;

  try {
    // Check if admin exists
    const admin = await Admin.findOne({ adminId });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // If credentials are correct, send success response
    res.json({ message: "Login successful" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// CRUD Operations for Books
router.post("/books", async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.put("/books/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedBook);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/books/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Book.findByIdAndRemove(id);
    res.json({ message: "Book deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
