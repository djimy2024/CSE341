const express = require('express');
const app = express();


app.get('/', (req, res) => {
    res.send('Vela Sanon');
});

const port = 3000;
app.listen(process.env.port || port);
console.log('web server is listening at port' + (process.env.port || port));