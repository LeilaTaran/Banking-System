const mongoose = require('mongoose');
const express = require('express');
const app = express();

const Account = require('../models/account');
const Client = require('../models/client');
const router = express.Router();

router.post('/account', (req, res, next) => {
    const account =  new Account({
        client_id: req.params.id,
        balance: req.params.balance,
        alias: req.params.alias // AFLÆSER IKKE ALIAS
    });
    account.save().
    then(result => {
        console.log(result); // then we can see the result here
        res.status(201).json({ //201 --> den er gået igennem
            message: 'Account created'
        });
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

module.exports = router;