let express=require('express');
let route=express.Router();

let inventoryController=require('../controllers/inventory')



route.get('/list',inventoryController.list);

/*Get route for displaying the Add page-create operation*/
route.get('/add',requireAuth,inventoryController.displayAddPage);

/*Post route for processing the Add page-create operation*/
route.post('/add',requireAuth,inventoryController.processAddPage);

/*Get route for processing the Add page-create operation,we will be able to use id in func displayEditPage 
by using params as we are passing it in route*/
route.get('/edit/:id',requireAuth,inventoryController.displayEditPage); 

/*Post route for processing the Add page-create operation*/
route.post('/edit/:id',requireAuth,inventoryController.processEditPage);

/*Get route for delete */
route.get('/delete/:id',requireAuth,inventoryController.performDelete); 

// helper function for guard purposes
function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        req.session.url = req.originalUrl;
        return res.redirect('/users/signin');
    }
    next();
}

module.exports=route; //exporting route should always be at last