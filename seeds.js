var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment =require("./models/comment");
var data =[
    {name: "john",image:"http://blog.turebi.ge/wp-content/uploads/2015/10/campfire.jpg",description:"kdjflksdjlfksldk"},
    {name: "hans",image:"http://blog.turebi.ge/wp-content/uploads/2015/10/campfire.jpg",description:"kdjflksdjlfksldk"},
    {name: "simon",image:"http://blog.turebi.ge/wp-content/uploads/2015/10/campfire.jpg",description:"kdjflksdjlfksldk"},
    {name: "sami",image:"http://blog.turebi.ge/wp-content/uploads/2015/10/campfire.jpg",description:"kdjflksdjlfksldk"}
    ]
function seeddb(){
    Campground.remove({},function(err){
        if(err){
            console.log("something wrong in a seed.js file ",err)
        }
          console.log("seed removed everything from our db")
             data.forEach(function(seed){
        Campground.create(seed,function(err,campground){
            if(err){
                console.log("something is wrong in adding data in a seed",err)
            }else{
                console.log("created seed succesfully")
                Comment.create({author:"bla bla",text: "this is so coll"},function(err,comment){
                    if(err){
                        console.log("this si error from seed comment",err)
                    }else{
                        campground.comments.push(comment);
                        campground.save(function(err,data){
                            if(err){
                                console.log("some thing is wrong in saving comment in seed")
                            }else{
                                console.log("you have succesfully saved data in seed",data)
                            }
                        })
                    }
                });
            }
        });
    });
    });
}

module.exports = seeddb;