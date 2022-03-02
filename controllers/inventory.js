let Inventory=require('../models/inventory');

exports.list =  function(req,res,next){
    Inventory.find((err,inventoryList)=>{  //first parameter incase of error, second parametr incase of success
    
    if(err)
      {
        return console.error(err);
      }
    else{
        //console.log(inventoryList);
        res.render(
             'inventory/list', 
            { 
               title: 'Inventory List' ,
               InventoryList: inventoryList
            }
          );
    }
    });
}

//could write as exports.functionName  same meaning as module.exports.funcName
//function(req,res,next) same meaning as (req,res,next)
module.exports.displayAddPage = (req,res,next)=>{    
  
  let newItem=Inventory();

  res.render('inventory/add_edit',
  {
       title:'Add a new item',
       item: newItem     //in template add_edit.js we will use item to reference to newitem
  })
}

module.exports.processAddPage = (req,res,next)=>{

    let newItem=Inventory({
      _id: req.body.id,
      item: req.body.item,      //here we are giving req.body.name(from ejs-html template) into model name
      qty: req.body.qty,
      size:{
        h:req.body.h_size,
        w:req.body.w_size,
        uom:req.body.uom_size,
      },
      tags:req.body.tag.split(",").map(word=>word.trim()) //this is js,tags will have array of words
    });

    Inventory.create(newItem,(err,item)=>{
       if(err)
       {
         console.log(err);
         res.end(err);
       }
       else
       {
         console.log(item);
         res.redirect('/inventory/list');
       }
    });
}

module.exports.displayEditPage = (req,res,next)=>{    
  
  let id=req.params.id

  Inventory.findById(id,(err,itemToEdit)=>{  //incase of success , this will return the itemtoEdit or fail by error

     if(err)
     {
        console.log(err);
        res.end(err);
     }

    else
     {

       res.render('inventory/add_edit',
        {
             //show edit item
             title:'Edit Item',
             item: itemToEdit  
        })       //in template add_edit.js we will use item to reference to itemToEdit
     }
  });
}

module.exports.processEditPage = (req,res,next)=>{

   let id=req.params.id

  let updatedItem=Inventory({
    _id: req.body.id,
    item: req.body.item,      //here we are giving req.body.name(from ejs-html template) into model name
    qty: req.body.qty,
    size:{
      h:req.body.h_size,
      w:req.body.w_size,
      uom:req.body.uom_size,
    },
    tags:req.body.tag.split(",").map(word=>word.trim()) //this is js,tags will have array of words
  });

  Inventory.updateOne({_id:id},updatedItem,(err)=>{  //this{_id:id} is search criteria
     if(err)
     {
       console.log(err);
       res.end(err);
     }
     else
     {
       //refresh the list
       res.redirect('/inventory/list');
     }
  });
}


module.exports.performDelete=(req,res,next)=>{
   
    let id=req.params.id;

    Inventory.remove({_id:id},(err)=>{
       if(err)
       {
         console.log(err);
         res.end(err);
       }
       else
       {
         //refresh the list
         res.redirect('/inventory/list');
       }
    });
}