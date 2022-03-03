let express=require('express');
let route=express.Router();

let businessController=require('../controllers/business')



route.get('/list',businessController.list);

/*Get route for displaying the Add page-create operation*/
route.get('/add',requireAuth,businessController.displayAddPage);

/*Post route for processing the Add page-create operation*/
route.post('/add',requireAuth,businessController.processAddPage);

/*Get route for processing the Add page-create operation,we will be able to use id in func displayEditPage 
by using params as we are passing it in route*/
route.get('/edit/:id',requireAuth,businessController.displayEditPage); 

/*Post route for processing the Add page-create operation*/
route.post('/edit/:id',requireAuth,businessController.processEditPage);

/*Get route for delete */
route.get('/delete/:id',requireAuth,businessController.performDelete); 

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