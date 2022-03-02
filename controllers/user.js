let User=require('../models/user');
let passport=require('passport');

exports.user= function(req,res,next){
    res.render('user',{
         title:'Users',
         name:'Student'
    });
}

exports.kanishka= function(req,res,next){
    res.render('user',{
         title:'User',
         name:'Kanishka'
    });
}

function getErrorMessage(err){
     console.log("===>Error: ",err);
     let message = '';
    
     if(err.code){
        switch(err.code){
           case 11000:
           case 11001:
               message="Uername already exists";
               break;
            default:
                message="Something went wrong";
        }
    }  else{
        for (var errName in err.errors){
            if(err.errors[errName].message) message=err.errors[errName].message;
        }
    }
    return message;
};

module.exports.renderSignUp = function(req,res,next){
    if(!req.user){

        //creates a new user object
        let newUser=User();
         res.render('auth/signUp',{
             title:'SignUp Form',
             messages: req.flash('error'),
             user:newUser
         });
    }
    else {
        return res.redirect('/');
    }
};

module.exports.signup=function(req,res,next){
    if(!req.user){
        console.log(req.body);

        let user=new User(req.body);

        console.log(user);

        user.save((err)=>{
            if(err){
                let message=getErrorMessage(err)
                req.flash('error',message);
                return res.render('auth/signUp',{
                    title:'SignUp Form',
                    messages: req.flash('error'),
                    user:user
            });
            }
        req.login(user,(err)=>{
            if(err) return next(err);
            return res.redirect('/');
        });
      });
    }
    else{
        return res.render('/');
    }
};