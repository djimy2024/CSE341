const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Books Api',
        description: 'Books Api'
    },

    info: {
        title: 'Authors Api',
        description: 'Authors Api'
    },

    host: 'localhost:3001',
    schemes:['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);