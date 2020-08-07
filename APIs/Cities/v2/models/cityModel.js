var mongoose = require("mongoose");

var citiesSchema = new mongoose.Schema({
    name:String,
    img:String,
    description:String,
    comments : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Comment"
        }
    ]
});

module.exports = mongoose.model("City",citiesSchema);
