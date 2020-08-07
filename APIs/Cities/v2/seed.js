var mongoose = require("mongoose");
var City = require("./models/cityModel");
var Comment = require("./models/commentModel");
var data = [
    {
        name : "London",
        img : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSMHlkuUJ6CRy4twxMBv49LXhgwYvQNCM9W6Tab_r_5ph0bFgLA&usqp=CAU",
        description : "it's tower city"
    },
    {
        name : "New York",
        img : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSMHlkuUJ6CRy4twxMBv49LXhgwYvQNCM9W6Tab_r_5ph0bFgLA&usqp=CAU",
        description : "World Trade center"
    },
    {
        name : "Bangalore",
        img : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSMHlkuUJ6CRy4twxMBv49LXhgwYvQNCM9W6Tab_r_5ph0bFgLA&usqp=CAU",
        description : "it Hub"
    }
]

function seedDB()
{
    Comment.remove({}, function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("comments removed");
        }
    });
    City.remove({}, function(err){
        if(err)
            console.log(err);
        console.log("Cities Removed");
        data.forEach(function(seed){
            City.create(seed, function(err, city){
                if(err)
                    console.log(err);
                console.log("City Added");
                Comment.create({
                        text : "Wow",
                        author : "Vishwa",
                    },function(err, comment){
                        if(err)
                            console.log(err);
                        else{
                            city.comments.push(comment);
                            city.save();
                            console.log("Created New comment")
                        }
                    }
                );
            })
        });
    });
}

module.exports = seedDB;