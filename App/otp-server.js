// otp-server.js

// Import the express library
const express = require('express');
// Create an instance of the express app
const app = express();
// Define the port the server will run on
const port = 3000;

// Use built-in middleware to serve static files from the 'public' directory
// This is where you will place your otp-index.html, otp-style.css, and otp-script.js files
app.use(express.static('public'));

// Define the root route for the home page and specify the new filename
app.get('/', (req, res) => {
    // res.sendFile() is used to send a specific file.
    // The { root: './public' } option tells the server where to look for the file.
    res.sendFile('otp-index.html', { root: './public' });
    console.log('Serving the otp-index.html file...');
});

// Start the server and listen for incoming requests on the specified port
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    console.log('Open this URL in your browser to view the OTP verification page.');
});
