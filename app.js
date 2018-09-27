'use strict'
// We load the express and body-parser modules
const express = require('express')
const bodyParser = require('body-parser')
// We call express to be able to create the server
const app = express()
const api = require('./routes')


// We configure bodyParser to convert the body of our requests to JSON
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/api', api)
// Defining a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Oiga Technologies API Rest, this is my technical test. Francisco Vélásquez Escobar."});
});
// We export this module to be able to use the app variable outside of this file
module.exports = app;