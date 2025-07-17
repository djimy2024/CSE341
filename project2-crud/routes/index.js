
const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Welcome to the bookstore');});
    
router.use('/books', require('./books'));

module.exports = router;







