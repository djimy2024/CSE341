// Import and initialize the swagger-autogen module which generates the Swagger JSON file automatically
const swaggerAutogen = require('swagger-autogen')();

// Define the Swagger documentation metadata
const doc = {
    info: {
        title: 'Final Project',          // Title of the API documentation
        description: 'Final Project'     // Description shown in Swagger UI
    },

    host: 'cse341-final-project-ldhw.onrender.com',              // The base URL for my API (change this if deploying online)
    schemes: ['https']                    // The scheme/protocol used (can be 'http' or 'https')
};

// Path to the output file that will be generated (swagger.json)
const outputFile = './swagger.json';

// Path to the file(s) that contain your route definitions (used to scan for Swagger comments)
const endpointsFiles = ['./routes/index.js'];

// Generate the Swagger file using the provided info, routes, and configuration
swaggerAutogen(outputFile, endpointsFiles, doc);
