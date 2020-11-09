const Client = require('../models/client');

module.exports = (req,res) => {
  //Skaber en bruger med req.params og returnerer dataen eller en string baseret på, om en fejl er opstået.
  Client.create(JSON.parse(req.params.clients), (error, result) => {
    if(error){
      console.log("User doesn't have an unique username");
      res.send("User doesn't have an unique username");
    }
    else{
      console.log("User have been created");
      res.send(result);
    }
  })
};