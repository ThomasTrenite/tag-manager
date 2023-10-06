// Import express
const express = require('express')
// Create our app
const app = express()

// Require the JSON file
const tagData = require("./tags.json");

// GET request for retrieving data
app.get("/api", (request, response) => {
    // Log the data before sending it in the response
    console.log(tagData);

    // This is essentially the back end API data. This data will be fetched on the front end.
    response.json(tagData);
    
})

// Start up our app. Server listens to port 5000
app.listen(5000, () => {
    console.log("Server started on port 5000")
})

