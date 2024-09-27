const lists=require("../model/schema.js")
const review=require("../model/review.js");

module.exports.createreview=async(req,res)=>{
    let newlisting=await lists.findById(req.params.id);
    let newreview=new review(req.body.reviews);

    newreview.author=req.user._id;
    
    // await listing.reviews.push(newreview);
     await newlisting.reviews.push(newreview);
     
   
    
   
    await newreview.save();
    await newlisting.save();
    req.flash("success","New review Added!");

   
   res.redirect(`/listings/${newlisting._id}`);

    }

    module.exports.destroyreview=async(req,res)=>{
        let {id,rid}=req.params;
    
        await lists.findByIdAndUpdate(id,{$pull:{reviews:rid}});
        await review.findByIdAndDelete(rid);
        req.flash("success","reviews Deleted!");
       res.redirect(`/listings/${id}`);
    }