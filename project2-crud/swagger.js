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

    host: 'cse341-crud-70bp.onrender.com',
    schemes:['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);