let express=require('express');
let router=express.Router();

let userController=require('../controllers/user')


router.get('/',userController.user);

router.get('/kanishka',userController.kanishka);

//Sign-up
router.get('/signup',userController.renderSignUp);
//Sign-in
router.post('/signup',userController.signup);
module.exports=router;