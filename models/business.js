let mongoose= require('mongoose');

//Create a model class
let businessModel=mongoose.Schema(
    {
        contactName :String,
        contactNumber: Number,
        email: String
    },
    {   
        collection:"business"  //give name of collection in database that you want to associate ur model to
    }
    
    );

//exports inventory collection as inventoryModel. this model func comes with create,upadte,search methods for mongodb, to manipulate data    
module.exports=mongoose.model("business",businessModel); 