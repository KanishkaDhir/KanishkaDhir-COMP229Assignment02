let mongoose= require('mongoose');

//Create a model class
let inventoryModel=mongoose.Schema(
    {
        item:String,
        qty:Number,
        tags:[],
        size:{
            h:Number,
            w:Number,
            uom:String,
        },
        status:String
    },
    {   
        collection:"inventory"  //give name of collection in database that you want to associate ur model to
    }
    
    );

//exports inventory collection as inventoryModel. this model func comes with create,upadte,search methods for mongodb, to manipulate data    
module.exports=mongoose.model("inventory",inventoryModel); 