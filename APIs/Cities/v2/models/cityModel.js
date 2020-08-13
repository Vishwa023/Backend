var mongoose = require("mongoose");

var citiesSchema = new mongoose.Schema({
    name:String,
    img:String,
    description:String,
    comments : [
        {
            text : String,
            author : String
        }
    ]
});

module.exports = mongoose.model("City",citiesSchema);
