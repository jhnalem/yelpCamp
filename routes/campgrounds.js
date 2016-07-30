var express = require("express");
var router = express.Router();
// require Campgrounds model in oder to fix the issue
var Campground =require("./../models/campground");
var Comment = require("./../models/comment");
//campground routes
router.get('/',function(req,res){
    Campground.find({},function(err,allcampgrounds){
        if(err){
            console.log(err,"there is something wrong in get all campgrounds from the mongodb");
        }else{
            console.log("you have succesfully got all your campgrounds from db",allcampgrounds);
            res.render("campgrounds/index",{compounds: allcampgrounds}) 
        }
    });
   
});

router.post('/campgrounds',isLoggedIn, function(req,res){
    //   console.log(req.user._id,"this is amazing i willbe there in the same way od dile")
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    //get data from the form and add it to database
    var campground = new Campground({
        name:req.body.name,
        image:req.body.image,
        description:req.body.description,
        author: author
    });
    campground.save(function(err,camp){
        if(err){
            console.log("some thing went wrong", err)
        }else{
            console.log("you have succesfully saved camp to the data base",camp)
        }
    });
    res.redirect('/')
})
router.get('/campgrounds/new',isLoggedIn, function(req,res){
    res.render('campgrounds/new');
})
//this will show a single compound by id
router.get('/campgrounds/:id',isLoggedIn,function(req, res) {
    // find the campground with the provided id
    Campground.findById(req.params.id).populate('comments').exec(function(err,compground){
        if(err){
            console.log("something wrong in showing a single compground",err)
        }else{
            console.log("you have succesfully grapped  one campground by  id  from the db",compground)
            res.render("campgrounds/show",{campground: compground})
        }
    });
});
 //edit campground route
router.get('/campgrounds/:id/edit',function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log("error in editing campground",err)
        }else{
            res.render("campgrounds/edit",{campground:campground})
        }
    })
    
});

//update campground
router.put('/campgrounds/:id',function(req,res){
    console.log(req.params.id,"this is just id coming form the show page")
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
        if(err){
            console.log("error in updating")
            res.redirect('/campgrounds/:id/edit');
        }else{
            console.log("succesfully updated")
            res.redirect('/campgrounds/'+ updatedCampground._id);
        }
    });
})

// destroy a campground
router.delete('/campgrounds/:id',function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            console.log("there is something wrong in deleting")
        }else{
            console.log('succesfully logged out')
            res.redirect("/")
        }
    })
})


// create a middleware function here to log in a user
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login')
}
module.exports = router;