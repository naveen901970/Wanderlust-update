const mongoose = require('mongoose');
const {Schema}=mongoose;
const review=require("./review.js");
const User=require("./user.js");
const { Strategy } = require('passport-local');
const { required } = require('joi');


const listingschema= new Schema({
    title:{
        type:String,
        require:true,
    },
    description:String,
    image:{
        // type:String,
        // default:"https://th.bing.com/th/id/OIP.mMfDbfeirUydQoXiSlgA9gAAAA?rs=1&pid=ImgDetMain",
        // set:(v)=>
        //     v===""?"https://th.bing.com/th/id/OIP.mMfDbfeirUydQoXiSlgA9gAAAA?rs=1&pid=ImgDetMain":v
        url:String,
        filename:String,
        },
        price:{
            type:Number

        },
        location:String,
        country:String,
    //     reviews:[{
    //         type:Schema.Types.ObjectId,
    //         ref:"review"
    //     }
        
    // ],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "review"
        }
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
   geometry:{
    
        type: {
            type: String,
            enum: ['Point', 'LineString', 'Polygon'],
            
        },
      coordinates: {
        type: [Number],
        required: true
      }
   }
});


listingschema.post("findOneAndDelete",async(lists)=>{
    if(lists.reviews.length){
        await review.deleteMany({_id:{$in:lists.reviews}})
    }
})
const lists=mongoose.model("lists",listingschema)

module.exports=lists;