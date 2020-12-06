const https = require('https');
const httpProxy = require('http-proxy');
const seaport = require('seaport');

const path = require('path');
const fs = require('fs');

var seaportConnect = seaport.connect('localhost', 9090); //holder styr på serverne og portene til serverne

var proxy = new httpProxy.createProxyServer({});
var i = - 1;

var addresses = []; //tilslutter application layer
var socket = https.createServer({key:fs.readFileSync(path.join(__dirname, 'certificate', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'certificate', 'cert.pem'))},function (req, res) {
    addresses = seaportConnect.query("sslServer"); // er det her en SSL socket?
    if (addresses.length == 0) {
        res.end("Connection closed");
    }
    i = (i + 1) % addresses.length; // hver gang der kommer et request ind, bliver det sendt til forskellige server ligelidt.
    var host = addresses[i].host.split(":").reverse()[0]; //splitter de ledige addresser host og port fra hinanden.
    var port = addresses[i].port;
    proxy.web(req, res, { target: 'https://' + host + ':' + port, secure : false }); // false fordi det er self signed certificate
    console.log("The server is listening on port: " + port)
});

socket.listen(3443, function () {
    console.log("loadbalance is listening");
});

/* const serverRun = require('./app.js');
serverRun; */