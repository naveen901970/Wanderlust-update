const lists=require("./model/schema");
const reviews=require("./model/review.js");
const Expresserror=require("./utils/expresserrors")
// const {listingschem,reviewSchema}=require("./model/schema.js");
const {listingschem,reviewSchema}=require("./schema.js");



module.exports.isLoggedin=(req,res,next)=>{
    // console.log(req.path,"..",req.originalUrl)

    if(!req.isAuthenticated()){
            req.session.redirectUrl=req.originalUrl;
           req.flash("error","you must be logged in to create listing");
           return res.redirect("/login")
    }
    next();
};

module.exports.saveredirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next()
}

module.exports.isowner=async(req,res,next)=>{
    let {id}=req.params;
   let listings=await lists.findById(id);
   if( !listings.owner._id.equals( res.locals.curruser._id)){
    req.flash("error","you are not the owner of this listing");
    return res.redirect(`/listings/${id}`)

   
   }
   next();
}


module.exports.validatelisting=(req,res,next)=>{
    let {error}=listingschem.validate(req.body);
    if(error){
        let errmsg=error.details.map((el)=>el.message).join(",");
        throw new Expresserror(400,errmsg);
    }else{
        next()
    }
}

module.exports.validatereview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
        let errmsg=error.details.map((el)=>el.message).join(",");
        throw new Expresserror(400,errmsg);
    }else{
        next()
    }
}
module.exports.isreviewauthor=async(req,res,next)=>{
    let {rid,id}=req.params;
    let review=  await  reviews.findById(rid);
   
   if( !review.author.equals( res.locals.curruser._id)){
    req.flash("error","you are not the author of this review");
    return res.redirect(`/listings/${id}`)

   
   }
   next();
}