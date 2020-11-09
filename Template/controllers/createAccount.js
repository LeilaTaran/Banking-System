const Client = require('../models/client');
const Account = require('../models/account');

module.exports = (req,res) => {
    console.log(req.session);
    // Evaluerer om brugeren er admin.
    User.findOne({$and:[{_id:req.session.client_id}]},(error,result)=>{
        // Hvis brugeren er en admin.
        if(result){
            console.log(result);
            // Vi opretter en account. For at vi kan oprette objektet account i databasen, benyttes JSON.parse
            Account.create(JSON.parse(req.params.accounts), (error2, result2) => {
                if(result2){
                    console.log("Account have been created");
                    res.send(JSON.stringify(result2));
                }
                else{
                    // Hvis der opstår en fejl, er det på grund af, at alle lektioner skal have et unikt lektionsnavn, da vi har gjordt dette [uniqe: true] i schema
                    console.log("Your account doesn't have an unique id");
                    res.send("Your lesson doesn't have an unique id");
                }
            })
        }
        // Hvis brugeren ikke findes.
        else{
            //Hvis User.findOne ikke kan finde et dokument i databasen, betyder dette, at ingen er logget ind som admin
            console.log("Please create a client");
            res.send("Please create a client");
        }
    })
};
