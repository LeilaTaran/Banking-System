// custom modules
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const https = require('https');

app.use(bodyParser.json()); // body-parser can parse different kinds of body-forms, we want to accept JSON-data

// Connection to DB
mongoose.connect('mongodb://localhost:27017/bankingSystem', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

var seaport = require('seaport');
var seaportConnect = seaport.connect('localhost', 9090);

//SERVER
const sslServer = https.createServer({key:fs.readFileSync(path.join(__dirname, 'certificate', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'certificate', 'cert.pem'))}, app);


//This application will listen on port 3443
sslServer.listen(seaportConnect.register('sslServer'), function() {
    console.log(this.address().port);
    console.log('server running');
});

//TESTER
app.get('/', async (req, res) => {
    try {
        res.end("This is the GET endpoint on accounts")
    } catch (err) {
        console.log({ message: err })
    };
});

//SEARCH CLIENT TEST
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
