const mongoose = require('mongoose');
// Jeg laver et "client" skema

const ClientSchema = new mongoose.Schema ({
    // Alle som strings, udover "id"
    // I tivl om Id skal med i skemaet??
    /* id: {
         type: objectId,
         required: true,
     },
     */
    client_id: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    },
    alias: {
        type: String,
        required: true,
    }
});

const model = mongoose.model('Client', ClientSchema);
module.exports = model;

