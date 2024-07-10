const Book = require("../models/Book");

exports.createBook = async (req, res) => {
  const { title, author, genre } = req.body;

  try {
    const newBook = new Book({ title, author, genre });
    await newBook.save();
    res.json(newBook);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, genre } = req.body;

  try {
    let book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }

    book.title = title;
    book.author = author;
    book.genre = genre;
    await book.save();
    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    let book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }

    await book.remove();
    res.json({ msg: "Book removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
