var express = require("express");
var app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname +'/public'));
var bodyParser = require('body-parser');
//this is used to update a form 
var methodOverride = require("method-override")
// require passport
var passport = require("passport");
//require passport-local
var localStrategy = require("passport-local");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+'/public'));
var mongoose = require("mongoose");
// require campground model
var Campground = require("./models/campground");
//require comment model
var Comment =require("./models/comment");
// require Use model here
var User = require("./models/user")
var seedDB = require("./seeds");
// seedDB(); // commented out for now
// requiring routes
var commentRoutes = require("./routes/comments");
var campgroundRoutes =require("./routes/campgrounds");
var indexRoutes =require("./routes/index");
//connnet to database
//  mongoose.connect('mongodb://localhost/yelp_camp');

// this is for deployment purpose , i got this from mongolab
//  mongodb://<yohannes>:<wedialem2>@ds031865.mlab.com:31865/yelpcamp
 
  mongoose.connect('mongodb://yohannes:wedialem2@ds031865.mlab.com:31865/yelpcamp');
//this used to update a form
app.use(methodOverride('_method'));

//passport configuration
app.use(require("express-session")({
    secret: "this could be anything !",
    resave: false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// this will run for every route hit ,this is middleware b/n http req and routes
app.use(function(req,res,next){
    res.locals.currentUser =req.user;
    next();
});
app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);

app.listen(process.env.PORT, process.env.IP,function(){
    console.log("yelp camp server is runing")
});












