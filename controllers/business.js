let Business=require('../models/business');

exports.list =  function(req,res,next){
    Business.find((err,businessList)=>{  //first parameter incase of error, second parametr incase of success
    
    if(err)
      {
        return console.error(err);
      }
    else{
        //console.log(businessList);
        res.render(
             'business/list', 
            { 
               title: 'BusinessList' ,
               BusinessList: businessList,
               username: req.user ? req.user.username : ''
            }
          );
    }
    });
}

//could write as exports.functionName  same meaning as module.exports.funcName
//function(req,res,next) same meaning as (req,res,next)
module.exports.displayAddPage = (req,res,next)=>{    
  
  let newContact=Business();

  res.render('business/add_edit',
  {
       title:'Add a new Contact',
       contact: newContact ,
       username: req.user ? req.user.username : ''    //in template add_edit.js we will use item to reference to newitem
  })
}

module.exports.processAddPage = (req,res,next)=>{

    let newContact=Business({
      _id: req.body.id,
      contactName: req.body.contactName,
      contactNumber: req.body.contactNumber,
      email: req.body.email //this is js,tags will have array of words
    });

    Business.create(newContact,(err,contact)=>{
       if(err)
       {
         console.log(err);
         res.end(err);
       }
       else
       {
         console.log(contact);
         res.redirect('/business/list');
       }
    });
}

module.exports.displayEditPage = (req,res,next)=>{    
  
  let id=req.params.id

  Business.findById(id,(err,contactToEdit)=>{  //incase of success , this will return the itemtoEdit or fail by error

     if(err)
     {
        console.log(err);
        res.end(err);
     }

    else
     {

       res.render('business/add_edit',
        {
             //show edit item
             title:'Edit Contact',
             contact: contactToEdit ,
             username: req.user ? req.user.username : '' 
        })       //in template add_edit.js we will use item to reference to itemToEdit
     }
  });
}

module.exports.processEditPage = (req,res,next)=>{

   let id=req.params.id

  let updatedContact=Business({
    _id: req.body.id, //here we are giving req.body.name(from ejs-html template) into model name
    contactName: req.body.contactName,
    contactNumber: req.body.contactNumber,
    email: req.body.email
  });

  Business.updateOne({_id:id},updatedContact,(err)=>{  //this{_id:id} is search criteria
     if(err)
     {
       console.log(err);
       res.end(err);
     }
     else
     {
       //refresh the list
       res.redirect('/business/list');
     }
  });
}


module.exports.performDelete=(req,res,next)=>{
   
    let id=req.params.id;

    Business.remove({_id:id},(err)=>{
       if(err)
       {
         console.log(err);
         res.end(err);
       }
       else
       {
         //refresh the list
         res.redirect('/business/list');
       }
    });
}