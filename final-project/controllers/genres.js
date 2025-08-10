// Import required modules
const mongodb = require('../data/database'); // MongoDB connection wrapper
const { ObjectId } = require('mongodb');     // Helps convert string IDs to MongoDB ObjectId
const { validationResult } = require('express-validator'); // Used for validating input data

// GET all genres
const getAll = async (req, res) => {
  // Swagger tag for documentation
  //#swagger.tags=['Genres']
  try {
    // Query the 'genres' collection
    const genre = await mongodb.getDatabase().db().collection('genres').find();
    const genres = await genre.toArray(); // Convert cursor to array
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(genres); // Respond with the genres
  } catch (err) {
    // Handle error
    res.status(500).json({ message: err.message || 'An error occurred while fetching genres.' });
  }
};

// GET a single genre by ID
const getSingle = async (req, res) => {
  //#swagger.tags=['Genres']
  try {
    const genreId = new ObjectId(req.params.id); // Convert URL param to ObjectId
    const genre = await mongodb.getDatabase().db().collection('genres').find({ _id: genreId });
    const genres = await genre.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(genres[0]); // Send the first (and only) match
  } catch (err) {
    res.status(500).json({ message: err.message || 'An error occurred while fetching the genre.' });
  }
};

// POST a new genre (create)
const createGenre = async (req, res) => {
  //#swagger.tags=['Genres']
  try {
    // Validate the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // Return validation errors
    }

    // Build the genre object
    const genre = {
      name: req.body.name,
      description: req.body.description,
      popularAuthors: req.body.popularAuthors,
      exampleBooks: req.body.exampleBooks,
      origin: req.body.origin,
      subgenres: req.body.subgenres,
      themes: req.body.themes
    };

    // Insert into the database
    const response = await mongodb.getDatabase().db().collection('genres').insertOne(genre);
    if (response.acknowledged) {
      res.status(204).send(); // Successfully inserted
    } else {
      throw new Error('Insert not acknowledged');
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'An error occurred while creating the genre.' });
  }
};

// PUT (update) a genre by ID
const updateGenre = async (req, res) => {
  //#swagger.tags=['Genres']
  try {
    const errors = validationResult(req); // Validate input
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const genreId = new ObjectId(req.params.id); // Convert URL param to ObjectId
    const genre = {
      name: req.body.name,
      description: req.body.description,
      popularAuthors: req.body.popularAuthors,
      exampleBooks: req.body.exampleBooks,
      origin: req.body.origin,
      subgenres: req.body.subgenres,
      themes: req.body.themes
    };

    // Replace the existing document with new one
    const response = await mongodb.getDatabase().db().collection('genres').replaceOne({ _id: genreId }, genre);
    if (response.modifiedCount > 0) {
      res.status(204).send(); // Update success
    } else {
      throw new Error('No documents were modified.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'An error occurred while updating the genre.' });
  }
};

// DELETE a genre by ID
const deleteGenre = async (req, res) => {
  //#swagger.tags=['Genres']
  try {
    const genreId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('genres').deleteOne({ _id: genreId });
    if (response.deletedCount > 0) {
      res.status(204).send(); // Delete success
    } else {
      throw new Error('No documents were deleted.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'An error occurred while deleting the genre.' });
  }
};

// Export all the functions to be used in the routes
module.exports = {
  getAll,
  getSingle,
  createGenre,
  updateGenre,
  deleteGenre
};
