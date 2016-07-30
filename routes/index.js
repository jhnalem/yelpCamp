var express = require("express");
var router = express.Router();
var passport =require("passport")
var User = require("./../models/user");
// Auth routes
// this shows register form
router.get('/register',function(req, res) {
    res.render('register');
});

//this handles register form 
router.post('/register',function(req, res) {
    // this provided by local use mongoose
    var newUser = new User({username: req.body.username});
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            console.log("some this wrong in resistering a form");
            console.log(err)
        }else{
            passport.authenticate("local")(req,res,function(){
                res.redirect('/');
            });
        }
    })
});

// get a log in form
router.get('/login',function(req, res) {
    res.render('login');
});
//handling log in logic
router.post('/login',passport.authenticate('local',{
    
    successRedirect: '/',
    failureRedirect: "/login"
}),function(req,res){
    console.log("you can remove function it doesnt do any thing here")
});


// handle logout
router.get('/logout',function(req, res) {
    req.logout();
    res.redirect("/login")
});

// create a middleware function here to log in a user
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login')
}
module.exports= router;