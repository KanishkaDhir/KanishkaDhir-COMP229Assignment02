//Author: Kanishka Dhir
//Student ID:301220757
//Date:02-02-2022

//rendering to index template
exports.home = function(req, res, next) {
    res.render('index', { 
      title: 'Home',
      username: req.user ? req.user.username : ''  
    });
  }

  //rendering to projects template
exports.projects =  function(req, res, next) {
    res.render('projects', { 
      title: 'Projects',
      username: req.user ? req.user.username : ''
     });
  }

  //rendering to about template
exports.about =  function(req, res, next) {
  res.render('about', {
     title: 'About',
     username: req.user ? req.user.username : ''
 });
}

//rendering to services template
exports.services =  function(req, res, next) {
    res.render('services', { 
      title: 'Services',
      username: req.user ? req.user.username : '' });
  }

  //rendering to contact template
exports.contact =  function(req, res, next) {
    res.render('contact', {
       title: 'Contact',
       username: req.user ? req.user.username : '' });
  }