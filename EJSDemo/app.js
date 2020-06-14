var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine","ejs");

app.get("/:name",function(req,res){
    var name = req.params.name;
    res.render("home",{n:name});
});

app.get("/:name/posts",function(req,res){
    var posts = [
        {title:"Post 1", author:"a"},
        {title:"Post 2", author:"b"},
        {title:"Post 3", author:"c"}
    ]
    res.render("posts",{posts:posts});
});

app.listen(3000,function(){
    console.log("listening on Port 3000");
});