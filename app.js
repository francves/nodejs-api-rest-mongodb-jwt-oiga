'use strict'
// We load the express and body-parser modules
const express = require('express');
const bodyParser = require('body-parser');
// We call express to be able to create the server
const app = express();
// We configure bodyParser to convert the body of our requests to JSON
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
// We export this module to be able to use the app variable outside of this file
module.exports = app;