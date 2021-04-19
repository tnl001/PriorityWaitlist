// Import packages
const path = require('path');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const pg = require('pg');
const async = require('async');

// Create an express app
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Server's hostname and port
const hostname = '0.0.0.0';
const port = process.env.PORT || 5555;


// Steps to connect the server to the database
let database;
const databaseURL = "[INSERT YOUR DATABASE URL HERE]";
const connectClient = new pg.Client(databaseURL);
connectClient.connect();


/**
 * This function queries the database from postgres
 * Use the query function from Postgres Client Object
 * 
 * PARAMETER: None
 * RETURN: Void
 */
function getData() {
    connectClient.query(`SELECT * FROM "PriorityWaitlist";`, (error, result) => {
        if (error) {
            console.log(error);
        } else {
            database = result.rows;
        }
    });
}


// Load the data
async.waterfall([getData], (err, res) => { console.log(err); });


// This will fix the CORS policy things
app.use(cors());

// Setting the view. We don't need this yet so don't worry about it
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/**
 * GET request to /api and assign the queried database
 */
app.get('/api', (req, res) => {
    res.status(200).json(
        database
    );
});
    
/**
 * POST request to /api
 */
 app.post('/api', (req, res) => {
    const data = req.body;
    const id = data.id;
    const name = data.name;
    const priority = data.priority;

    connectClient.query(`INSERT INTO "PriorityWaitlist" (uuid, name, priority) VALUES ($1, $2, $3);`, [id, name, priority], (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Add Status: Success!');
            async.waterfall([getData], (err, res) => { console.log(err); });
        }
    });
    console.log('Insert pending: ');
    console.log(data);
    res.status(200).send(req.body);
    
});

/**
 * DELETE request to /api
 */

app.delete('/api', (req, res) => {
    let resData = [];
       
    async.waterfall( [
        function(callback) {
            
            connectClient.query(`DELETE FROM "PriorityWaitlist" WHERE priority = (SELECT MAX(priority) FROM "PriorityWaitlist") RETURNING *;`, (err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    async.waterfall([getData], (err, res) => { console.log(err); });
                    console.log(`Delete Status: ${res.rowCount} entry(s) - Success!`);
                    resData = res.rows;
                    console.log(resData);  
                    callback();
                    // console.log(res.rows);     
                }
            });
            
        },

        function(callback) {
            res.status(200).send(resData);
            // callback();
        }
    ], (err, res) => { 
        console.log(err); 
    }); 
})


/**
 * Port listen
 */
app.listen(port, () => {
    console.log("Server running at: https://localhost:" + port);
})