//Author:Kanishka Dhir
//Student ID:301220757
//Date:01-02-2022

var express = require('express');
var router = express.Router();
let indexController = require('../controllers/index')

/* GET Home page. */
router.get('/',indexController.home );


/* GET Projects page. */
router.get('/projects', indexController.projects);

/* GET About page. */
router.get('/about', indexController.about);

/* GET Services page. */
router.get('/services', indexController.services);

/* GET Contact page. */
router.get('/contact', indexController.contact);




module.exports = router;
