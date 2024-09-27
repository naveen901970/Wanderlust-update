const lists=require("../model/schema.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const maptoken=process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: maptoken });

// const mbxgeocoding = require('@mapbox/mapbox-sdk/services/tilesets');

// // const geocodingClient = mbxgeocoding({ accessToken:maptoken });

module.exports.index=async(req,res)=>{
    let newlist= await lists.find();
    res.render("./listing/index.ejs",{newlist})
}

module.exports.createroute=(req,res)=>{
    console.log("this is working");
    res.render("./listing/create.ejs")
}

module.exports.showroutedeatils=async(req,res)=>{
    
    let {id}=req.params;
    let newlist1= await lists.findById(id)
    .populate({path:"reviews",
        populate:{path:"author"}
    })
    .populate("owner");
    // console.log(newlist1);
    if(!newlist1){
        req.flash("error","listing you reqested for does not exit!");
        res.redirect("/listings");
    }

    res.render("./listing/show.ejs",{newlist1});
}
module.exports.creatingdatato_mainpage=async(req,res,next)=>{
  let response= await geocodingClient
  .forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
      })
    .send()
       
     
    let url=req.file.path;
    let filename=req.file.filename;

    if(!req.body.listing){
       throw new Expresserror(400,"send  a valid data  for listing")
    }
        let newlisting= new lists(req.body.listing);
        newlisting.owner=req.user._id;
        newlisting.image={url ,filename }
        newlisting.geometry= response.body.features[0].geometry
        let savelisting=await newlisting.save();
        console.log(savelisting)
      req.flash("success","New list created!");
   
      res.redirect("./listings")
     

}
module.exports.rendereditroute=async (req,res)=>{
    let {id}=req.params;
    let newlist1= await lists.findById(id)
    if(!newlist1){
     req.flash("error","listing you reqested for does not exit!");
     res.redirect("/listings");
 }

 let originalimage=newlist1.image.url;
 let originalimageurl=originalimage.replace("/upload","/upload/h_300,w_250")
    res.render("./listing/edit.ejs",{newlist1,originalimageurl})
 }


 module.exports.afteredited=async(req,res)=>{
    let {id}=req.params;
    let listing=await lists.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file!=="undefined"){
        let url=req.file.path;
    let filename=req.file.filename;
    listing.image={url ,filename }
     await listing.save()
    }
    req.flash("success","Listing Edited successfully!");
    res.redirect(`/listings/${id}`)
 
 }
 module.exports.deleteroute=async(req,res)=>{
    let {id}=req.params;
    await lists.findByIdAndDelete(id);
    req.flash("success","Listing deleted !");
     res.redirect("/listings");
 }