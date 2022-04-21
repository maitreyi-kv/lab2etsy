const mongoose = require("mongoose");

const URL = 'mongodb+srv://etsyuser:AnjsCNJWArTnll5Q@etsy-clone.xiwsj.mongodb.net/etsy-clone'
mongoose.connect(URL).then(() => console.log("Connected")).catch(err => console.log("Err in connection", err));


