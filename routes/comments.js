var express = require("express");
var router =express.Router();

// require Campgrounds model and comment model in oder to fix the  issue in comment and campground models
var Campground =require("./../models/campground");
var Comment = require("./../models/comment");

// comment routes
router.get('/campgrounds/:id/comments/new',isLoggedIn, function(req, res) {
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err,"something is wrong in requesting form");
        }else{
              res.render('comments/new',{ campground: campground } );
        }
    });
  
});

// Cannot POST /campgrounds/5798463c3d6cf7826cdc4328/comments
router.post('/campgrounds/:id/comments',function(req, res) {
    console.log("i made it");
    Campground.findById(req.params.id,function(err, campground) {
        if(err){
            console.log("there is error in getting Campground from the comment field")
        }else{
            
//   user.user is coming from because the user is loggingIn
            console.log(req.user.username, "this is logged in user")
            
            
            Comment.create(req.body.comment,function(error,comment){
                if(error){
                    console.log("there some thing wrong in form comment")
                }else{
                    
            // add user id and username to to the comment db
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save(function(error){
                        if(error){
                            console.log("some thing is wrong in compground")
                        }else{
                             console.log("you have succesfully added comment to the campground");
                             res.redirect('/campgrounds/'+ campground.id)
                        }
                    });
                   
                }
            });
        }
    })
});

// create a middleware function here to log in a user
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login')
}

module.exports = router;
