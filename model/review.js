const mongoose = require('mongoose');


const listingschema= new mongoose.Schema({
    comment:String,
    rating:{
        type:Number,
        min:0,
        max:5
    },
    createdat:{
        type:Date,
        default:Date.now()
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
    
})


module.exports=mongoose.model("review",listingschema)


