let express=require('express');
let router=express.Router();

let userController=require('../controllers/user')


router.get('/',userController.user);

router.get('/kanishka',userController.kanishka);

//Sign-up
router.get('/signup',userController.renderSignUp);
router.post('/signup',userController.signup);

//Singin
router.get('/signin',userController.renderSignin);
router.post('/signin',userController.signin);

// Sign out
router.get('/signout', userController.signout);
module.exports=router;