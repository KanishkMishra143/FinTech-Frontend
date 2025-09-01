// server.js

// Import the express library
const express = require('express');
// Create an instance of the express app
const app = express();
// Define the port the server will run on
const port = 3000;

// Use built-in middleware to serve static files from the 'public' directory
// This is where you will place your index.html, style.css, and script.js files
app.use(express.static('public'));

// Define a simple root route for the home page
// This route will serve the index.html file by default
app.get('/', (req, res) => {
    // This isn't strictly necessary with express.static but can be useful for debugging
    console.log('Serving the index.html file...');
});

// Start the server and listen for incoming requests on the specified port
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    console.log('Open this URL in your browser to view the feedback form.');
});

