require('dotenv').config()
console.log(process.env.SECRET)

///------------------------============NMP PACKAGES=======--------------------------------
const express=require("express");
const app=express();
const path= require("path")
const port=9009 ;
const mongoose = require('mongoose');
var methodOverride = require('method-override');
const ejsMeta = require('ejs-mate');
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./model/user.js");
//--------------------------------------------------------------------------------
// ======RERUIRED FROM OTHER FILES=====
app.use(methodOverride('_method'))
// const lists=require("./model/schema");
// const wrapasycn=require("./utils/wrapasync");
const Expresserror=require("./utils/expresserrors")
// const {listingschem,reviewSchema}=require("./schema.js");
// const review=require("./model/review.js");
var session = require('express-session');
const MongoStore = require('connect-mongo');
const flash=require('connect-flash');

const listingsRouter=require("./routes/listing.js");
const reviewsRouter=require("./routes/reviews.js");
const userRouter=require("./routes/user.js");
const { error, clear } = require('console');
// ------------------------------------------------------------------------------------
//=====PATH AND CONNECTION SETUP====
app.set("view engine","ejs");
app.set('views', 'views');
app.set("views",path.join(__dirname,"/views"))

app.use(express.urlencoded({extended:true}));
app.engine('ejs', ejsMeta);
app.use(express.static(path.join(__dirname,"public")))


const dburl=process.env.ATLASDB_URL
// const mogodb='mongodb://127.0.0.1:27017/airbin'
main().then((res)=>{
    console.log("connection is sucsses")
}).catch((err)=>{
    console.log(err)
})
async function main() {
  await mongoose.connect(dburl);
 
}
//=====SESSIONS======
const store=MongoStore.create({
    mongoUrl:dburl,
    crypto:{
        secret:process.env.SECRET
    },
    touchAfter:24*3600,
})

store.on("error",()=>{
    console.log("ERROR in mongo session store:",err)
})

const sessionOptions={
    store,
    secret:process.env.SECRET,
  resave :false,
  saveUninitialized:true,
  cookie:  {
 expires:Date.now()  +  7 * 24 * 60 * 60 * 1000,
 maxAge:7 * 24 * 60 * 60 * 1000,
 httpOnly:true,
  }
  }


  app.use(session(sessionOptions));
  app.use(flash());


  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy(User.authenticate()));

  passport.serializeUser(User.serializeUser());
 passport.deserializeUser(User.deserializeUser());
//==================================

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.curruser=req.user;
    next();
})
app.get("/demouser",async(req,res)=>{
    let fakeuser= new User({
        username:"naveen",
        email:"naveen657@gmail.com"
    });
    let result=await User.register(fakeuser,"helloworld");

    res.send(result);
})

app.use("/listings",listingsRouter);
 
// ================================================================
//======= REVIEWS======

app.use("/listings/:id/reviews",reviewsRouter)

app.use("/",userRouter);









//===========================================================================================
//--------------------============EORROR HANDELER============-------------------------------
app.all("*",(req,res,next)=>{
    next(new Expresserror (401,"page was not found"))
})


app.use((err,req,res,next)=>{
    let {StatusCode=500,message="some error"}=err
    res.status(StatusCode) .render("listing/error.ejs",{message})
 //    res.status(statusCode).send(message);
  })







app.listen(port,(req,res)=>{
    console.log(`your are lisenting to the server ${port}`)
})



// -----------------------------------------------------------------------------------------------
// let result=listingschem.validate(req.body);
// if(result.error){
//  throw new Expresserror(401,result.error);
// }
// console.log(result);
//main route




 
//  app.use((err,req,res,next)=>{
//    let {StatusCode,message}=err
//    res.status(StatusCode) .render("listing/error.ejs",{message})
// //    res.status(statusCode).send(message);
//  })



