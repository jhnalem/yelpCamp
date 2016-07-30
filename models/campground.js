var mongoose = require("mongoose");

// set up schema
var campgroundSchema = new mongoose.Schema({
    name: String,
    image:String,
    description: String,
    author:{
          id: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User'
            },
          username:String
        },
    comments:[
          { type: mongoose.Schema.Types.ObjectId,
            ref:'Comment'
          }
        ]
});
//compile the Schema to a model so that we can access it using javascript methods
// out collection name will be Compoundgrounds , it will pick the name from the model
module.exports = mongoose.model('Campground',campgroundSchema);
