const express = require('express');

const mongodb = require('./data/database');
const app = express();

const port = process.env.PORT || 3000;

app.use('/', require('./routes'));
app.listen( port);

mongodb.intDb((err) => {
    if(err) {
        console.log(err);
    }
    else{
        console.log('web server is listening at port' + port);
    }
});
