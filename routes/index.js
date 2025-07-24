
const passport = require('passport'); 
const route = require('express').Router();
const {isAuthenticate} = require('../middleware/authenticate');

route.use('/', require('./swagger'));

route.get('/', (req, res) => {
    //#swagger.tags=['Hello world']
    res.send('Hello world');});
    
route.use('/users', require('./users'));

route.get('/login', passport.authenticate('github'), (req, res) => {});

route.get('/logout', function(req, res, next) {
    req.logout(function(err){
        if (err) { return next(err); }
        res.redirect('/');
    });
});


module.exports = route;