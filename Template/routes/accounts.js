const mongoose = require('mongoose');
const express = require('express');
const app = express();

const Account = require('../models/account');
const Client = require('../models/client');
const router = express.Router();

// [2]FIND ALL ACCOUNTS
router.get('/hent', async (req, res) => { //async fordi den venter på CREATE CLIENT løber igennem, før vi kan return clients
    try {
        // 1. return clients from database instead
        return res.json(await Account.find({})
            .exec());
    } catch (err) {
        console.log({ message: err.message })
    }
});

// FIND SPECIFIC ACCOUNT
router.get('/:id', async (req, res) => { //async fordi den venter på CREATE CLIENT løber igennem, før vi kan return clients
    Account.findById({_id: req.params.id}).then(function(account){
            res.send(account)
        });
    });

// [1]CREATE ACCOUNT
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
});

// UPDATE ACCOUNT (OBS! SE OM MAN KUN KAN ÆNDRE PÅ BALANCE SENERE)
router.put('/update', function (req, res, next) {
    Account.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(account){ //findByIdAndUpdate finder brugeren i databasen og opdatere dens oplysninger. Selve funktionen indtager et "id" som parameter. Her specificeres den ønskede id som skal opdateres. "req.body" angiver det body som opdatere den eksisterende information i databasen
        Client.findOne({_id: req.params.id}).then(function(account){ //
            res.send({account});
        });
    });
});

// DELETE ACCOUNT
router.delete('/delete/:id', function(req, res, next){
    Account.findByIdAndRemove({_id: req.params.id}) //the mongo method will try to mach the ':id' in the URL to the _id in the database
        .then(function(account){ // then it will remove the client with the match
            res.send(account); // we want to send the client which we delete, and the record has been deleted from the database
        });
});

module.exports = router;