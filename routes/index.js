//const lesson1controller = require('../controllers/lesson1');
const route = require('express').Router();

//route.get('/', (req, res) => {res.send('Hello world');});
route.use('/users', require('./users'));

//route.get('/', lesson1controller.djessieroute);
//route.get('/vela', lesson1controller.velaroute);
//route.get('/djimy', lesson1controller.djimyroute);

module.exports = route;