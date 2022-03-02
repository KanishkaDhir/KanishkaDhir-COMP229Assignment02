//Author: Kanishka Dhir
//Student ID:301220757
//Date:01-02-2022

let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let session = require('express-session');
let flash= require('connect-flash');
let passport=require('passport');

//Get the routes modules
let indexRouter = require('../routes/index');
let userRouter=require('../routes/users');
let inventoryRouter=require('../routes/inventory');

let app = express();

app.use(session({
  saveUninitialized:true,
  resave:true,
  secret:"sessionSecret"
}));

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../node_modules')));

//after we setup the ejs above we use the routers
app.use(flash());
app.use('/', indexRouter);
app.use('/inventory', inventoryRouter);
app.use('/users',userRouter);


//after we setup routers , we configure two event listeners to catch errors
// catch 404 and forward to error handler
app.use(function(req, res, next) {  //this just gives us the statuscodes.
  next(createError(404));  //404 error is not from express point of view so it is configured separately.
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
