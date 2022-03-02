let express=require('express');
let route=express.Router();

let inventoryController=require('../controllers/inventory')


route.get('/list',inventoryController.list);

/*Get route for displaying the Add page-create operation*/
route.get('/add',inventoryController.displayAddPage);

/*Post route for processing the Add page-create operation*/
route.post('/add',inventoryController.processAddPage);

/*Get route for processing the Add page-create operation,we will be able to use id in func displayEditPage 
by using params as we are passing it in route*/
route.get('/edit/:id',inventoryController.displayEditPage); 

/*Post route for processing the Add page-create operation*/
route.post('/edit/:id',inventoryController.processEditPage);

/*Get route for delete */
route.get('/delete/:id',inventoryController.performDelete); 

module.exports=route; //exporting route should always be at last