const express=require("express");
const router=express.Router();
const User=require("../model/user");
const wrapasync = require("../utils/wrapasync");
const passport=require("passport");
const {isLoggedin,saveredirectUrl}=require("../maddleware.js");
const usercontroller=require("../controller/userdesign.js")


router.route("/signup")
.get(usercontroller.rendersignupform)
.post(wrapasync(usercontroller.signupform));
// router.get("/signup",usercontroller.rendersignupform)

// router.post('/signup', wrapasync(usercontroller.signupform));
router.route("/login")
.get(usercontroller.renderloginform)
.post(saveredirectUrl,
    passport.authenticate('local',
         { failureRedirect: '/login',
            failureFlash:true 
        }),
usercontroller.login

         );

// router.get("/login",usercontroller.renderloginform)

// router.post("/login",saveredirectUrl,
//     passport.authenticate('local',
//          { failureRedirect: '/login',
//             failureFlash:true 
//         }),
// usercontroller.login

//          )


router.get("/logout",usercontroller.logoutform)


module.exports=router;