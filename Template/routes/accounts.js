const mongoose = require('mongoose');
const express = require('express');
const app = express();

const Account = require('../models/account');
const Client = require('../models/client');
const router = express.Router();

// [1] RETURNERER ET ARRAY AF ALLE KONTI
router.get('/', async (req, res) => { //async fordi den venter på CREATE CLIENT løber igennem, før vi kan return clients
    try {
        // 1. return clients from database instead
        return res.json(await Account.find({})
            .exec());
    } catch (err) {
        console.log({ message: err.message })
    }
});

// [2] OPRETTE EN NY KONTO
router.post('/', function(req, res){
    Account.create(req.body).then(function(account){
        res.send(account);
    });
});

/* [2] OPRETTE EN NY KONTO GAMMEL
router.post('/create/:client_id/:balance', (req, res, next) => {
    const account =  new Account({
        _id: new mongoose.Types.ObjectId(),
        client_id: req.params.client_id,
        balance: req.params.balance,
        alias: "", // alias er optinal i opgave beskrivelsen.
    });
    account.save().
    then(result => {
        console.log(result); // then we can see the result here
        res.status(201).json({ //201 --> den er gået igennem
            message: 'account created'
        });
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
}); */

// [3] RETURNERE EN SPECIFIK KONTO
router.get('/:id', async (req, res) => { //async fordi den venter på CREATE CLIENT løber igennem, før vi kan return clients
    Account.findById({_id: req.params.id}).then(function(account){
            res.send(account)
        });
    });

// [4] ÆNDRE EN KONTO. DET ER KUN BALANCEN SOM KAN ÆNDRES (OBS! SE OM MAN KUN KAN ÆNDRE PÅ BALANCE SENERE)
router.put('/:id', function (req, res, next) {
    Account.findByIdAndUpdate({_id: req.params.id}, {$set: {"balance": req.body.balance}}).then(function(account){
        Account.findOne({_id: req.params.id}).then(function (account) {
            res.send({account});
        });
    });
});

// [5] SLETTE EN KONTO MED DET SPECIFIKKE ID
router.delete('/:id', function(req, res, next){
    Account.findByIdAndRemove({_id: req.params.id}) //the mongo method will try to mach the ':id' in the URL to the _id in the database
        .then(function(account){ // then it will remove the client with the match
            res.send(account); // we want to send the client which we delete, and the record has been deleted from the database
        });
});

// [6] RETURNERER EN SPECIFIK KONTOS BALANCE I FORM {BALANCE: 200}
router.get('/:id/balance', async (req, res) => {
    Account.findById({_id: req.params.id})
        .then(account => {
            res.status(200).json({
                balance: account.balance
            });
        });
});

// [7] ACCOUNT TRANSFER (PENDING)
router.put('/transfer', function(req, res, next) {
    Account.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(account){
        Account.findOne({_id: req.params.id}).then(function(account){
            res.send({account});
        })
    })
    });

module.exports = router;