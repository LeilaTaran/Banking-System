const mongoose = require('mongoose');

// Jeg laver et "account" skema
const AccountSchema = new mongoose.Schema({
    // Alle som strings, udover "id"
    balance: {
        type: Number,
        required: true,
    },
    alias: {
        type: String,
        required: true,
    }
});
const model = mongoose.model('Account', AccountSchema);
module.exports = model;