//give db connection string with db name at last of string
//protocol://username:password@clusterAddress/databaseName
//Do not use this in produciton. Dont expose password, and dont show connection string
  let DB_CONNECTION="mongodb+srv://dbadmin:8CG52A4AYcArb30G@cluster001.88l1i.mongodb.net/Comp229-Week04";


    //Database setup
    let mongoose=require('mongoose');
    //let dbURI= require('../config/db'); not required now, if doing this in app.js then only require this
    

module.exports=function(){
    
    //Connect to DB
    mongoose.connect(DB_CONNECTION);
    
    let mongoDB=mongoose.connection;   //we are taking an instance of connection to setup two listeners:1.error 2.open
    
    mongoDB.on('error',console.error.bind(console,"Connection Error: "));
    mongoDB.once('open', ()=>{
      console.log("Connected to MongoDB...");     //this just lets us know that connection is established with db
    })

    return mongoDB;
}


