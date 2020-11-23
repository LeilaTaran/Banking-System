const mongoose = require('mongoose');
const express = require('express');
const app = express();
const router = express.Router();
const Client = require('../models/client');

mongoose.set('useFindAndModify', false);

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

// [1] Hent alle eksisterende kunder
router.get('/', async (req, res) => { //async fordi den venter på CREATE CLIENT løber igennem, før vi kan return clients
    Client.find()
        .exec() //vi eksekvere alle vores accounts
        .then(client => {
            res.status(200).json(client);
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

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
    // Vi henter de paramtrerne fra vores body, for at kunne oprette en client
    Client.create(req.body).then(function(client){
        res.send(client);
        res.status(200);// Opretter en ny instans af et client-objekt og sender det til klienten
    })
    // vi benytter catch for at se, hvilken fejl vi støder på i tilfælde af clienten ikke oprettes
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
    Client.findById({_id: req.params.id}).then(function(client){ // vi finder en specifik kunde gennem det unikke id tildelt til hver client.
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
            res.status(200).json(client);
        });
    });
});

// [5] SLETTE KUNDEN MED DET SPECIFIKKE ID
router.delete('/:id', function(req, res, next){
    Client.findByIdAndRemove({_id: req.params.id}) //mongo-metoden vil matche ':id' i URL'en til det _id der oprettes i databasen
        .then(function(client){ // herefter slettes kunden med det matchede med
            res.status(200);
            res.send(client); // vi eksekvere den client, der slettes fra databasen, og vi vil nu ikke kunne finde clienten længere.
    });
});

module.exports = router;
