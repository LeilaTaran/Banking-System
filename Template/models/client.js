const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
// Jeg laver et "client" skema

const ClientSchema = new mongoose.Schema ({
    // Alle som strings, udover "id"
    // I tivl om Id skal med i skemaet??
    /* id: {
         type: objectId,
         required: true,
     },
     */
    //_id: mongoose.Schema.Types.ObjectId,
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    street_address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    }
});

const model = mongoose.model('Client', ClientSchema);
module.exports = model;

