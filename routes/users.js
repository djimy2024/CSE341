const express = require('express');
const route = express.Router();
const usersController = require('../controllers/users');

route.get('/', usersController.getAll);
route.get('/:id', usersController.getSingle);

module.exports = route