// Import packages
const path = require('path');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

// Create an express app
const express = require('express');
const app = express();

// Server's hostname and port
const hostname = '0.0.0.0';
const port = process.env.PORT || 5555;

app.use(cors());


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/**
 * GET request to root and assign the queried database
 */
app.get('/', (req, res) => {
    res.status(200).json([
        {"id": uuidv4(), "name": "Tai", "priority": 18},
        {"id": uuidv4(), "name": "Tai", "priority": 26}
    ]);
});
    
/**
 * Port listen
 */
app.listen(port, () => {
    console.log("Server running at: https://localhost:" + port);
})