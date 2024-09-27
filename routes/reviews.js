const express=require("express");
const router=express.Router({mergeParams:true});
const lists=require("../model/schema");
const wrapasycn=require("../utils/wrapasync");
const Expresserror=require("../utils/expresserrors");
const review=require("../model/review.js");
// const {listingschem,reviewSchema}=require("../schema.js");
const reviewcontroller=require("../controller/reviewdesign.js")
const {isLoggedin,redirectUrl,isowner, validatelisting,isreviewauthor,validatereview}=require("../maddleware.js");







// const validatereview=(req,res,next)=>{
//     let {error}=reviewSchema.validate(req.body);
//     if(error){
//         let errmsg=error.details.map((el)=>el.message).join(",");
//         throw new Expresserror(400,errmsg);
//     }else{
//         next()
//     }
// }









 
// ================================================================
//======= REVIEWS======

router.post("/",validatereview,isLoggedin,wrapasycn(reviewcontroller.createreview));

   
//======------DELETING THE REVIEW ROUTE---------======================

router.post("/:rid",isLoggedin,isreviewauthor,wrapasycn(reviewcontroller.destroyreview));


module.exports=router;