const express=require("express");
let app=express();
let port=3000;
let path=require("path");
var flash = require('connect-flash');

var session = require('express-session');
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"))

// app.use(session({secret:"mysupersecretcode",
// resave :false,
// saveUninitialized:true,
// }));
// app.get("/test",(req,res)=>{
//     // if(req.session.count){
//     //     req.session.count++
//     // }else{
//         req.session.Count=1;
//     // }

const sessionOptions={
  secret:"mysupersecretstring",
resave :false,
saveUninitialized:true,
}

app.use(session(sessionOptions));
app.use(flash());
app.use((req,res,next)=>{
    res.locals.successmsg=req.flash("success")
    res.locals.errormsg=req.flash("error")
     next()
})

app.get("/resister",(req,res)=>{
  let {name="anonymous"}=req.query;
  req.session.name=name;
  if(name==="anonymous"){
    req.flash("error","you are not resistered")
  }else{
    req.flash("success","you are resister succesfully")
  }
 
  console.log(req.session.name);
  res.redirect("./invi");
  
})


app.get("/invi",(req,res)=>{
   
    res.render("page.ejs",{  name :req.session.name})
})

















app.listen(port,(req,res)=>{
    console.log(`your listing to the sever ${port}`)
})
