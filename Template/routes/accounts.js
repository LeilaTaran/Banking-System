const express = require('express');
const router = express.Router();
const Account = require('../models/account');

// Implement a new endpoint, that will be able to return a specific account by id.
router.get("/:id", async (req, res) => {
    try {
        const accounts = await Account.findById(req.params.id);
        res.end("This is the endpoint for" + accounts);
    } catch (err) {
        console.log({message:err})
    };
});

module.exports = router;