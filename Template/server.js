/* const express = require('express');
const https = require('https');
const path = require('path');
const fs = require('fs');
const app =express();

app.use('/', (req, res) => {
    res.end("WELCOME")
});

const sslServer = https.createServer({key:fs.readFileSync(path.join(__dirname, 'CK', 'key.pem')), cert: fs.readFileSync(path.join(__dirname, 'CK', 'cert.pem')) }, app);
//This application will listen on port 3000

sslServer.listen(3443, () => {
    console.log('Server listening on 3443');
}); */