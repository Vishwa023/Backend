var express = require("express");
var app = express();

app.get("/",function(req,res){
    res.send("Welcome to my website");
});

app.get("/speak/:animal",function(req,res){
    var sounds = {
        pig:"oink",
        cow:"Moo",
        cat:"Mew"
    }
    var animal = req.params.animal;
    var sound = sounds[animal];
    res.send("The animal says: " + sound);
});

app.get("/repeat/:word/:num", function(req,res){
    var word = req.params.word;
    var n = parseInt(req.params.num);
    var arr = "";
    for(var i=0;i<n;i++)
    {
        arr+=word+" ";
    }
    res.send(arr);
});

app.get("*",function(req,res){
    res.send("Sorry Page not found");
});

app.listen(3000,function(){
    console.log("server is running at 3000 port");
});