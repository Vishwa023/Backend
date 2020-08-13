var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    City          = require("./models/cityModel"),
    Comment       = require("./models/commentModel");
    // seedDB        = require("./seed"); // City Schema

//calling seedDB function
// seedDB();



// connnect mongodb (cities db)
mongoose.connect("mongodb://localhost/cities"); 
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
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

// Removing All cities

// City.remove({}, function(err){
//     if(err)
//         console.log(err);
//     else   
//         console.log("Cities Removed");
// });

// HomePage route
app.get("/",function(req,res){
    res.render("homePage");
});

// index route : Home page ( displays all cities )
app.get("/cities",function(req,res){
    City.find({},function(err,allCities){
        if(err){
            console.log("Error while finding City from database");
        }
        else{
            res.render("cityView/cities",{cities:allCities});
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
    res.render("cityView/new");
});

// show route: displays more info about city
app.get("/cities/:id",function(req,res){
    // find city with given id
    City.findById(req.params.id.trim(), function(err,foundCity){
        // console.log(req.params.id);
        // console.log(foundCity);
        if(err){
            console.log(err);
        }
        else{
            // console.log(foundCity.comments.text);ss
            res.render("cityView/show", { city : foundCity });
        }
    });
});

// ============================
// Comments Routes
// ============================

app.get("/cities/:id/comments/new", function(req, res){
    
    // if (req.params.id.match(/^[0-9a-fA-F]{24}$/)){

        City.findById(req.params.id.trim(), function(err, foundCity){
            if(err){
                console.log(err);
            }
            else {
                // console.log(foundCity);
                res.render("comments/new", { city : foundCity});
            }
        });
    // }
    // res.render("comments/new");
});

app.post("/cities/:id/comments", function(req, res){
    
    // if (req.params.id.match(/^[0-9a-fA-F]{24}$/)){

        City.findById(req.params.id.trim(), function(err, foundCity){
            if(err){
                console.log(err);
                res.redirect("/cities");
            }
            else {
                Comment.create(req.body.comment, function(err, comment){
                    // console.log(comment);
                    if(err){
                        console.log(err);
                    }
                    else{
                        foundCity.comments.push(comment);
                        foundCity.save();
                        comment.save();
                        console.log(foundCity._id);
                        res.redirect("/cities/" + foundCity._id);
                    }
                });
            }
        });
    // }
});

app.listen(3000, function(){
    console.log("App is running at 3000...");
});