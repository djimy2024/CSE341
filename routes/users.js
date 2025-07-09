const express = require('express');
const route = express.Router();
const usersController = require('../controllers/users');

route.get('/', usersController.getAll);
route.get('/:id', usersController.getSingle);

route.post('/', usersController.createUser);
route.put('/:id', usersController.updateUser);
route.delete('/:id', usersController.deleteUser);

module.exports = route