// custom modules
const express = require('express');
const app = new express();
const mongoose = require('mongoose');
const expressSession = require('express-session');


//Variables are created that contain controllers
const createClient = require('./controllers/createClient');
const deleteClient = require('./controllers/deleteClient');
const updateClient = require('./controllers/updateClient');

const createAccount = require('./controllers/createAccount');
const deleteAccount = require('./controllers/deleteAccount');
const updateAccount = require('./controllers/updateAccount');

// Connection to DB
mongoose.connect('mongodb://localhost/bankingSystem', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

app.use('/1', (req, res) => {
    res.end("WELCOME")
});


/*
//POST requests
app.post("/createClient/:client", createClient);

app.post("/createAccount:account", createAccount);

// PUT requests
app.put('/updateClient/:client_updatedInfo', updateClient);

app.put('/updateAccount/:account_updatedInfo', updateAccount);

// DELETE requests
app.delete('/deleteClient', deleteClient);
app.delete('/deleteAccount/:account_id', deleteAccount);

*/

/* //Variables are created that contain controllers
const createUser = require("./controllers/createUser");
const createLesson = require ("./controllers/createLesson");
const createBooking = require("./controllers/createBooking");*/