// Import required modules
const mongodb = require('../data/database'); // MongoDB connection
const { ObjectId } = require('mongodb'); // To handle MongoDB _id fields
const { validationResult } = require('express-validator'); // For request validation

// GET all authors
const getAll = async (req, res) => {
  //#swagger.tags=['Authors']
  try {
    // Fetch all authors from the collection
    const author = await mongodb.getDatabase().db().collection('authors').find();
    const authors = await author.toArray();

    // Return the list of authors
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(authors);
  } catch (err) {
    // Handle any errors
    res.status(500).json({ message: err.message || 'An error occurred while fetching authors.' });
  }
};

// GET a single author by ID
const getSingle = async (req, res) => {
  //#swagger.tags=['Authors']
  try {
    const authorId = new ObjectId(req.params.id); // Convert string ID to MongoDB ObjectId
    const author = await mongodb.getDatabase().db().collection('authors').find({ _id: authorId });
    const authors = await author.toArray();

    // Return the author if found
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(authors[0]);
  } catch (err) {
    res.status(500).json({ message: err.message || 'An error occurred while fetching the author.' });
  }
};

// POST (create) a new author
const createAuthor = async (req, res) => {
  //#swagger.tags=['Authors']
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Build author object from request body
    const author = {
      name: req.body.name,
      bio: req.body.bio,
      birthdate: req.body.birthdate
    };

    // Insert the new author into the database
    const response = await mongodb.getDatabase().db().collection('authors').insertOne(author);
    if (response.acknowledged) {
      res.status(204).send(); // Success, no content to return
    } else {
      throw new Error('Insert not acknowledged');
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'An error occurred while creating the author.' });
  }
};

// PUT (update) an existing author by ID
const updateAuthor = async (req, res) => {
  //#swagger.tags=['Authors']
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const authorId = new ObjectId(req.params.id);
    const author = {
      name: req.body.name,
      bio: req.body.bio,
      birthdate: req.body.birthdate
    };

    // Replace the existing author document
    const response = await mongodb.getDatabase().db().collection('authors').replaceOne({ _id: authorId }, author);
    if (response.modifiedCount > 0) {
      res.status(204).send(); // Success
    } else {
      throw new Error('No documents were modified.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'An error occurred while updating the author.' });
  }
};

// DELETE an author by ID
const deleteAuthor = async (req, res) => {
  //#swagger.tags=['Authors']
  try {
    const authorId = new ObjectId(req.params.id);

    // Delete the author
    const response = await mongodb.getDatabase().db().collection('authors').deleteOne({ _id: authorId });
    if (response.deletedCount > 0) {
      res.status(204).send(); // Success
    } else {
      throw new Error('No documents were deleted.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'An error occurred while deleting the author.' });
  }
};

// Export all controller functions
module.exports = {
  getAll,
  getSingle,
  createAuthor,
  updateAuthor,
  deleteAuthor
};
