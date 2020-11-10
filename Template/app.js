// custom modules
const express = require('express');
const mongoose = require('mongoose');
const https = require('https');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.json()); // body-parser can parse different kinds of body-forms, we want to accept JSON-data

// Connection to DB
mongoose.connect('mongodb://localhost:27017/bankingSystem', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

//SERVER
const sslServer = https.createServer({key:fs.readFileSync(path.join(__dirname, 'CK', 'key.pem')), cert: fs.readFileSync(path.join(__dirname, 'CK', 'cert.pem')) }, app);

//This application will listen on port 3443
sslServer.listen(3443, () => {
    console.log('Server listening on 3443');
});

//TESTER
app.get('/', async (req, res) => {
    try {
        res.end("This is the GET endpoint on accounts")
    } catch (err) {
        console.log({ message: err })
    };
});

//SEARCH CLIENT
app.get('/search/:name/:lastname/:address/:cityy', (req,res) => {
    res.end('Fornavn: ' + req.params.name +
            ' Efternavn: ' + req.params.lastname +
            ' Addresse: ' + req.params.address +
            ' By: ' + req.params.cityy);
});

//IMPORT CLIENT ROUTES
const clientRoutes = require('./routes/client');
app.use('/client', clientRoutes);

//IMPORT ACCOUNT ROUTES
const accountRoutes = require('./routes/accounts');
app.use('/accounts', accountRoutes);


app.use('/', (req, res) => {
    res.end("WELCOME")
});

app.use('/', (req, res) => {
    res.end("WELCOME")
});





//Variables are created that contain controllers


/*
const createClient = require('./controllers/createClient');
const deleteClient = require('./controllers/deleteClient');
const updateClient = require('./controllers/updateClient');

const createAccount = require('./controllers/createAccount');
const deleteAccount = require('./controllers/deleteAccount');
const updateAccount = require('./controllers/updateAccount'); */




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