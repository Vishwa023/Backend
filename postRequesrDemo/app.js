var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

var friends = ["Vishwa","Prit","Raj","Dhwani"];

app.get("/",function(req,res){
    res.send("HomePage");
});

app.get("/friends",function(req,res){
    res.render("friends",{friends:friends});
});

app.post("/addfriend",function(req,res){
    var newFriend = req.body.newFriend;
    friends.push(newFriend);
    res.render("friends",{friends:friends});
});


app.listen(3000,function(){
    console.log("App is running at 3000");
});
