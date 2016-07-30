var mongoose = require("mongoose");
//this will be required here in order our password to work
var passportLocalMongoose = require("passport-local-mongoose");
var UserSchema = mongoose.Schema({
     username:String ,
     password: String
    });
    
// plugin in here in order to work
// this will add methods and special functionality to our model .it will make it easier
UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User",UserSchema);