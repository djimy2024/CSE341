const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');
const { validationResult } = require('express-validator');

const getAll = async (req, res) => {
  //#swagger.tags=['Authors']
  try {
    const author = await mongodb.getDatabase().db().collection('authors').find();
    const authors = await author.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message || 'An error occurred while fetching authors.' });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Authors']
  try {
    const authorId = new ObjectId(req.params.id);
    const author = await mongodb.getDatabase().db().collection('authors').find({ _id: authorId });
    const authors = await author.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(authors[0]);
  } catch (err) {
    res.status(500).json({ message: err.message || 'An error occurred while fetching the author.' });
  }
};

const createAuthor = async (req, res) => {
   //#swagger.tags=['Authors']
   try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const author = {
      name: req.body.name,
      bio: req.body.bio,
      birthdate: req.body.birthdate
    };

    const response = await mongodb.getDatabase().db().collection('authors').insertOne(author);
    if (response.acknowledged) {
      res.status(204).send();
    } else {
      throw new Error('Insert not acknowledged');
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'An error occurred while creating the author.' });
  }
};

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

    const response = await mongodb.getDatabase().db().collection('authors').replaceOne({ _id: authorId }, author);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      throw new Error('No documents were modified.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'An error occurred while updating the author.' });
  }
};

const deleteAuthor = async (req, res) => {
   //#swagger.tags=['Authors']
  try {
    const authorId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('authors').deleteOne({ _id: authorId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      throw new Error('No documents were deleted.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'An error occurred while deleting the author.' });
  }
};

module.exports = {
  getAll,
  getSingle,
  createAuthor,
  updateAuthor,
  deleteAuthor
};
