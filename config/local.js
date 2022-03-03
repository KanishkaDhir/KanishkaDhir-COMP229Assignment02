//Author: Kanishka Dhir
//Student ID:301220757
//Date:03-03-2022 
const passport= require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/user');

module.exports= function(){
    console.log("==>Local Stragety function");

    passport.use(new LocalStrategy(authLocal));
};

function authLocal(username,password,done){
    console.log("==>Auth Local function");

    User.findOne({username:username},(err,user)=>{
        if(err)
        {
            return done(err);
        }
        if(!user)
        {
            return done(null,false,{message:'Unknown user'});
        }
        if(!user.authenticate(password))  //authenticate is function defined in user model
        {
            return done(null,false,{message:'Invalid password'});
        }
        return done(null,user);
    });
}