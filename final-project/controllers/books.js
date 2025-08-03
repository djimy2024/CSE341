// Import required modules
const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');
const { validationResult } = require('express-validator');

// Get all books
const getAll = async (req, res) => {
  //#swagger.tags=['Books']
  try {
    // Retrieve all documents from the 'books' collection
    const book = await mongodb.getDatabase().db().collection('books').find();
    const books = await book.toArray(); // Convert the result to an array
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(books); // Send the books as a JSON response
  } catch (err) {
    res.status(500).json({ message: err.message || 'An error occurred while fetching books.' });
  }
};

// Get a single book by ID
const getSingle = async (req, res) => {
  //#swagger.tags=['Books']
  try {
    const bookId = new ObjectId(req.params.id); // Convert string ID to ObjectId
    const book = await mongodb.getDatabase().db().collection('books').find({ _id: bookId });
    const books = await book.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(books[0]); // Return the first (and only) result
  } catch (err) {
    res.status(500).json({ message: err.message || 'An error occurred while fetching the book.' });
  }
};

// Create a new book
const createBook = async (req, res) => {
  //#swagger.tags=['Books']
  try {
    const errors = validationResult(req); // Check for validation errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Build book object from request body
    const book = {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      publishedDate: req.body.publishedDate,
      summary: req.body.summary
    };

    // Insert the book into the collection
    const response = await mongodb.getDatabase().db().collection('books').insertOne(book);
    if (response.acknowledged) {
      res.status(204).send(); // Success with no content
    } else {
      throw new Error('Insert not acknowledged');
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'An error occurred while creating the book.' });
  }
};

// Update an existing book
const updateBook = async (req, res) => {
  //#swagger.tags=['Books']
  try {
    const errors = validationResult(req); // Check for validation errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const bookId = new ObjectId(req.params.id);
    const book = {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      publishedDate: req.body.publishedDate,
      summary: req.body.summary
    };

    // Replace the existing document with the new one
    const response = await mongodb.getDatabase().db().collection('books').replaceOne({ _id: bookId }, book);
    if (response.modifiedCount > 0) {
      res.status(204).send(); // Success with no content
    } else {
      throw new Error('No documents were modified.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'An error occurred while updating the book.' });
  }
};

// Delete a book by ID
const deleteBook = async (req, res) => {
  //#swagger.tags=['Books']
  try {
    const bookId = new ObjectId(req.params.id); // Get book ID
    const response = await mongodb.getDatabase().db().collection('books').deleteOne({ _id: bookId }); // Delete book
    if (response.deletedCount > 0) {
      res.status(204).send(); // Successfully deleted
    } else {
      throw new Error('No documents were deleted.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'An error occurred while deleting the book.' });
  }
};

// Export all controller functions
module.exports = {
  getAll,
  getSingle,
  createBook,
  updateBook,
  deleteBook
};
