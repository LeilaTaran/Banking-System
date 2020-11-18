const mongoose = require('mongoose');
const express = require('express');
const app = express();
const router = express.Router();
const Client = require('../models/client');


// [1] Hent alle eksisterende kunder

router.get('/', async (req, res) => {
    Client.find()
        .exec()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


/* router.get('/', async (req, res) => {
    try {
        // 1. return accounts from database instead
        return res.json(await Client.find({})
            .exec());
    } catch (err) {
        console.log({ message: err.message })
    }
}); */

/*TEST
router.get('/test', async (req, res) => {
    try {
        res.end("This is a test")
    } catch (err) {
        console.log({ message: err })
    };
});

// [1] RETURNERE ET ARRAY AF ALLE KUNDER
router.get('/', async (req, res) => { //async fordi den venter på CREATE CLIENT løber igennem, før vi kan return clients
    try {
        // 1. return clients from database instead
        return res.json(await Client.find({})
            .exec());
    } catch (err) {
        console.log({ message: err.message })
    }
}); */

/* [2] OPRETTE EN NY KUNDE
router.post('/', function(req,res){
    Client.create(req.body).then(function(client){
        res.send(client); //creates new instance of client-object and saves it in the database
    });
}); */

// [2] OPRETTE EN NY KUNDE GAMMEL
router.post('/', (req, res, next) => {
    // For IKKE at skulle sende et ID med i body'en, så oprettes der et ID til en client
    const _id = new mongoose.Types.ObjectId;
    req.body._id = _id;
    // Ud fra bodyen'en, så henter systemet de enkelte parametre, som skal bruges til oprettelse af en bruger
    Client.create(req.body).then(function(client){
        res.send(client);
        res.status(200);// Opretter en ny instans af et client-objekt og sender det til klienten
    })
    // Hvis oprettelsen af klienten ikke lykkedes, catcher vi fejlen
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err,
                message: 'Fejl i oprettelsen'
            });
        });
});
   /* const client =  new Client({
        _id: new mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        street_address: req.body.street_address,
        city: req.body.city,
    });
    client.save().
    then(result => {
        console.log(result); // then we can see the result here
        res.status(200).json({ //201 --> den er gået igennem
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

    */


// [3] RETURNERER EN SPECIFIK KUNDE
router.get('/:id', async (req, res) => { //async fordi den venter på CREATE CLIENT løber igennem, før vi kan return clients
    Client.findById({_id: req.params.id}).then(function(client){
        res.status(200);
        res.send(client);
    });
});

// [4] OPDATERER EN KUNDES OPLYSNINGER
/* Måden hvorpå denne funktion fungerer, er ved at der via postman sendes et "body" afsted med det, som man
    ønsker at opdatere. Herefter vil den enkelte del som sendes, blive opdateret i databasen. Selve
    funktionen vil retunere det opdaterede objekt */
router.put('/:id', function (req, res, next) {
    Client.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(client){ //findByIdAndUpdate finder brugeren i databasen og opdatere dens oplysninger. Selve funktionen indtager et "id" som parameter. Her specificeres den ønskede id som skal opdateres. "req.body" angiver det body som opdatere den eksisterende information i databasen
        Client.findOne({_id: req.params.id}).then(function(client){ //
            res.status(200);
            res.send({client});
        });
    });
});

// [5] SLETTE KUNDEN MED DET SPECIFIKKE ID
router.delete('/:id', function(req, res, next){
    Client.findByIdAndRemove({_id: req.params.id}) //the mongo method will try to mach the ':id' in the URL to the _id in the database
        .then(function(client){ // then it will remove the client with the match
        res.send(client); // we want to send the client which we delete, and the record has been deleted from the database
    });
});

module.exports = router;
