// Import MongoDB configuration and tools
const mongodb = require('../data/database'); // Custom MongoDB client setup
const { ObjectId } = require('mongodb');     // Needed to work with MongoDB ObjectIds
const { validationResult } = require('express-validator'); // Used to handle validation results

// Get all publishers from the database
const getAll = async (req, res) => {
  //#swagger.tags=['Publishers']
  try {
    const publisher = await mongodb.getDatabase().db().collection('publishers').find(); // Get all documents in 'publishers'
    const publishers = await publisher.toArray(); // Convert the result to an array
    res.setHeader('Content-Type', 'application/json'); // Set response type
    res.status(200).json(publishers); // Send result with 200 OK
  } catch (err) {
    res.status(500).json({ message: err.message || 'An error occurred while fetching publishers.' }); // Error handling
  }
};

// Get a single publisher by ID
const getSingle = async (req, res) => {
  //#swagger.tags=['Publishers']
  try {
    const publisherId = new ObjectId(req.params.id); // Convert ID from URL to MongoDB ObjectId
    const publisher = await mongodb.getDatabase().db().collection('publishers').find({ _id: publisherId }); // Query by _id
    const publishers = await publisher.toArray(); // Convert result to array
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(publishers[0]); // Send the first (and only) match
  } catch (err) {
    res.status(500).json({ message: err.message || 'An error occurred while fetching the publisher.' });
  }
};

// Create a new publisher
const createPublisher = async (req, res) => {
  //#swagger.tags=['Publishers']
  try {
    const errors = validationResult(req); // Check for validation errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // Return 400 if invalid
    }

    // Create new publisher object from request body
    const publisher = {
      name: req.body.name,
      location: req.body.location,
      founded: req.body.founded,
      founders:req.body.founders,
      genresPublished:req.body.genresPublished,
      website:req.body.website,
      bestsellers:req.body.bestsellers
    };

    // Insert into MongoDB
    const response = await mongodb.getDatabase().db().collection('publishers').insertOne(publisher);
    if (response.acknowledged) {
      res.status(204).send(); // Return 204 No Content on success
    } else {
      throw new Error('Insert not acknowledged');
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'An error occurred while creating the publisher.' });
  }
};

// Update an existing publisher
const updatePublisher = async (req, res) => {
  //#swagger.tags=['Publishers']
  try {
    const errors = validationResult(req); // Check for validation errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const publisherId = new ObjectId(req.params.id); // Convert ID
    const publisher = {
      name: req.body.name,
      location: req.body.location,
      founded: req.body.founded,
      founders: req.body.founders,
      genresPublished: req.body.genresPublished,
      website: req.body.website,
      bestsellers: req.body.bestsellers
    };

    // Replace the existing document with the new data
    const response = await mongodb.getDatabase().db().collection('publishers').replaceOne({ _id: publisherId }, publisher);
    if (response.modifiedCount > 0) {
      res.status(204).send(); // Return 204 on success
    } else {
      throw new Error('No documents were modified.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'An error occurred while updating the publisher.' });
  }
};

// Delete a publisher by ID
const deletePublisher = async (req, res) => {
  //#swagger.tags=['Publishers']
  try {
    const publisherId = new ObjectId(req.params.id); // Convert ID
    const response = await mongodb.getDatabase().db().collection('publishers').deleteOne({ _id: publisherId }); // Delete by _id
    if (response.deletedCount > 0) {
      res.status(204).send(); // Return 204 No Content on success
    } else {
      throw new Error('No documents were deleted.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'An error occurred while deleting the publisher.' });
  }
};

// Export all controller functions
module.exports = {
  getAll,
  getSingle,
  createPublisher,
  updatePublisher,
  deletePublisher
};
