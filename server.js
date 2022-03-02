#!/usr/bin/env node

/**
 * Module dependencies.
 */

//Author: Kanishka Dhir
//Student ID:301220757
//Date:01-02-2022
var dbConfig = require('./config/db');
var appConfig = require('./config/app');
var passportConfig=require('./config/passport');
var debug = require('debug')('kanishkadhir-comp229assignment1:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

let db=dbConfig(); //calling the function db
var port = normalizePort(process.env.PORT || '3000');
appConfig.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(appConfig);  //will create a server using our app

/**
 * Listen on provided port, on all network interfaces.
 * //same approach as for db, creating two event listeners , one for error, second for open
 */
let passport=passportConfig();
server.listen(port);  
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false. to normalize the error
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
  console.log(`App is running at http://localhost:${port}`)
}
