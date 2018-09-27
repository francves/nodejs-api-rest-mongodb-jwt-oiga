'use strict'
// We load the app.js file with the Express configuration
const app = require('./app');
//DB config
const config = require('./config');
// We load the mongoose module to connect to MongoDB
const mongoose = require('mongoose');
// We tell Mongoose that we will make the connection with Promises
mongoose.Promise = global.Promise;
// We use the connect method to connect to our database
mongoose.connect(config.url,  { useNewUrlParser: true })
    .then(() => {
        // When the connection is made, we launch this message by console
        console.log("The connection to the database is heard correctly")
        
        // Create the web server with nodejs
		app.listen(config.port, () => {
    		console.log("server running on http://localhost:3000");
		});
    })
    // If it does not connect correctly we throw the error
    .catch(err => console.log(err));
