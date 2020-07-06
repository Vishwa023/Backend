var express = require("express");
var app = express();
app.set("view engine","ejs");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

var cities = [
    {name:"Paris", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSMHlkuUJ6CRy4twxMBv49LXhgwYvQNCM9W6Tab_r_5ph0bFgLA&usqp=CAU"},
    {name:"Amsterdam", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSMHlkuUJ6CRy4twxMBv49LXhgwYvQNCM9W6Tab_r_5ph0bFgLA&usqp=CAU"},
    {name: "New York", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSMHlkuUJ6CRy4twxMBv49LXhgwYvQNCM9W6Tab_r_5ph0bFgLA&usqp=CAU"}
]

app.get("/",function(req,res){
    res.render("homePage");
});

app.get("/cities",function(req,res){
    res.render("cities",{cities:cities});
});

app.post("/cities",function(req,res){
    // console.log(req.body);
    var newCity = req.body.cityName;
    var imageUrl = req.body.img;
    var city = {name:newCity, img:imageUrl};
    // console.log(newCity);
    // console.log(imageUrl);
    cities.push(city);
    res.redirect("/cities");
});

app.get("/cities/new",function(req,res){
    res.render("new");
});

app.listen(3000, function(){
    console.log("App is running at 3000...");
});