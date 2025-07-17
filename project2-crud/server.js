const express = require('express');
const booksRoutes = require('./routes/books'); 
const cors = require('cors');
require('dotenv').config(); 

const mongodb = require('./data/database');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // pou pèmèt API a akeyi request ki soti lòt kote
app.use(express.json()); // pou li JSON body
app.use('/books', booksRoutes);
app.use(express.urlencoded({ extended: true })); 

// Routes
app.use('/', require('./routes'));

// Start server
mongodb.initDb((err) => {
    if (err) {
        console.log('❌ Database connection failed:', err);
    } else {
        app.listen(port, () => {
            console.log(`✅ Web server is listening at port ${port}`);
        });
    }
});
