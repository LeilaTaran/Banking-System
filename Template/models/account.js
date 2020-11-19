const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// Jeg laver et "account" skema
const AccountSchema = new mongoose.Schema({
    // Alle som strings, udover "id"
    client_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Client",
        required: true
    },
    balance: {
        type: Number,
        required: false, // false fordi den er optional i opgave-beskrivelsen
    },
    alias: {
        type: String,
        required: false, // false fordi den er optional i opgave-beskrivelsen
    }
});

const model = mongoose.model('Account', AccountSchema);
module.exports = model;