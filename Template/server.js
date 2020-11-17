/*
const path = require('path');
const fs = require('fs');
const https = require('https');
const express = require('express');
const app = express();
var seaport = require('seaport');
var httpProxy = require('http-proxy');
var seaportConnect = seaport.connect('localhost', 3443);

//SERVER
const sslServer = https.createServer({key:fs.readFileSync(path.join(__dirname, 'CK', 'key.pem')), cert: fs.readFileSync(path.join(__dirname, 'CK', 'cert.pem')) }, app);


//This application will listen on port 3443
sslServer.listen(3443, () => {
    console.log('Server listening on 3443');
}); */

