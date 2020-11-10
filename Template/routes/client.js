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

//FIND CLIENT
router.get('/hent', async (req, res) => { //async fordi den venter på CREATE CLIENT løber igennem, før vi kan return clients
    try {
        // 1. return clients from database instead
        return res.json(await Client.find({})
            .exec());
    } catch (err) {
        console.log({ message: err.message })
    }
});

//CREATE CLIENT
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

//UPDATE CLIENT
router.put('/update'), (req, res) => {
    Client.updateOne
}



module.exports = router;
