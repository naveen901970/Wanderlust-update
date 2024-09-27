
const User=require("../model/user");


module.exports.rendersignupform=(req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.signupform=async (req, res,next) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email }); // Pass an object to the constructor
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err)
            };
            req.flash('success', 'Welcome to Wanderlust');
            res.redirect("/listings");
        })
        
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/signup');
    }
}
module.exports.renderloginform=async(req,res)=>{
    res.render("users/login.ejs")
}
module.exports.login=async(req,res)=>{
    req.flash("success","Wellcome To Wanderlust ")
    let rediect=res.locals.redirectUrl ||  "listings";
res.redirect(rediect);
}

module.exports.logoutform=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
    });
    req.flash("success","you are logged out!");
    res.redirect("/listings");
}