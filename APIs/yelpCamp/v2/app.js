var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose")

// connnect mongodb (cities db)
mongoose.connect("mongodb://localhost/cities"); 
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

// Schema SetUp

var citiesSchema = new mongoose.Schema({
    name:String,
    img:String,
    description:String
});

var City = mongoose.model("City",citiesSchema);

// creating city object manually

// City.create({

//     name:"Amsterdem",
//     img:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSMHlkuUJ6CRy4twxMBv49LXhgwYvQNCM9W6Tab_r_5ph0bFgLA&usqp=CAU",
//     dis:"This is a beautiful city"
// },function(err,city){
//     if(err){
//         console.log("Error While creating city Object");
//     }
//     else {
//         console.log(city);
//     }
// });

// app.get("/",function(req,res){
//     res.render("homePage");
// });

// index route : Home page ( displays all cities )
app.get("/cities",function(req,res){
    City.find({},function(err,allCities){
        if(err){
            console.log("Error while finding City from database");
        }
        else{
            res.render("cities",{cities:allCities});
        }
    });
});

// create route : add new city to Database
app.post("/cities",function(req,res){
    // console.log(req.body);
    var newCity = req.body.cityName;
    var imageUrl = req.body.img;
    var des = req.body.description;
    var city = {name:newCity, img:imageUrl, description:des};
    // console.log(newCity);
    // console.log(imageUrl);
    City.create(city,function(err,newCity){
        if(err){
            console.log("Error While Creating New City");
        }
        else{
            res.redirect("/cities");
        }
    });
});

// new route : display form to get new city from user
app.get("/cities/new",function(req,res){
    res.render("new");
});

// show route: displays more info about city
app.get("/cities/:id",function(req,res){
    // find city with given id
    City.findById(req.params.id,function(err,foundCity){
        if(err){
            console.log("Error while finding id");
        }
        else{
            // console.log(foundCity);
            res.render("show", { city:foundCity });
        }
    });
});

app.listen(3000, function(){
    console.log("App is running at 3000...");
});