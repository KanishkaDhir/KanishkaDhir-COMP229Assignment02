//Author: Kanishka Dhir
//Student ID:301220757
//Date:03-03-2022 
const passport= require('passport');

module.exports = function(){
     const User=require('../models/user');

     //When a user is authenticated,passport will save its _id property to the session
     passport.serializeUser((user,done)=>{
         done(null,user.id);
     });
    
     //Later on, when user object is needed,passport will user the _id property to grab the user object from database.
     passport.deserializeUser((id,done)=>{
         //this means give me the object containing userNAme,firstNAme, etc but dont give password and salt
         User.findOne(
             {_id:id},
             '-password -salt',
             (err,user)=>{  
             done(err,user);
         }
         );
    });
    require('./local')();
};