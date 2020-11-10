const mongoose = require('mongoose');
const express = require('express');
const app = express();
const router = express.Router();
const Client = require('../models/client');
const nodemon = require('nodemon');

//TEST
router.get('/test', async (req, res) => {
    try {
        res.end("This is a test")
    } catch (err) {
        console.log({ message: err })
    };
});

// [2]FIND CLIENT
router.get('/hent', async (req, res) => { //async fordi den venter på CREATE CLIENT løber igennem, før vi kan return clients
    try {
        // 1. return clients from database instead
        return res.json(await Client.find({})
            .exec());
    } catch (err) {
        console.log({ message: err.message })
    }
});

// [1]CREATE CLIENT
router.post('/create/:firstName/:lastName/:street_address/:city', (req, res, next) => {
    const client =  new Client({
        _id: new mongoose.Types.ObjectId(),
        firstName: req.params.firstName,
        lastName: req.params.lastName,
        street_address: req.params.street_address,
        city: req.params.city,
    });
    client.save().
    then(result => {
        console.log(result); // then we can see the result here
        res.status(201).json({ //201 --> den er gået igennem
            message: 'Client created'
        });
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

// [3]UPDATE CLIENT
/* Måden hvorpå denne funktion fungerer, er ved at der via postman sendes et "body" afsted med det, som man
    ønsker at opdatere. Herefter vil den enkelte del som sendes, blive opdateret i databasen. Selve
    funktionen vil retunere det opdaterede objekt */
router.put('/:id', function (req, res, next) {
    Client.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(client){ //findByIdAndUpdate finder brugeren i databasen og opdatere dens oplysninger. Selve funktionen indtager et "id" som parameter. Her specificeres den ønskede id som skal opdateres. "req.body" angiver det body som opdatere den eksisterende information i databasen
        Client.findOne({_id: req.params.id}).then(function(client){ //
            res.send({client});
        });
    });
});


// [4]DELETE CLIENT
router.delete('/delete/:id', function(req, res, next){
    Client.findByIdAndRemove({_id: req.params.id}) //the mongo method will try to mach the ':id' in the URL to the _id in the database
        .then(function(client){ // then it will remove the client with the match
        res.send(client); // we want to send the client which we delete, and the record has been deleted from the database
    });
});

module.exports = router;
