/**
 * Created by lluis on 10/11/2016.
 */
'use strict';

var http = require('http');
var https = require('https');
var express = require('express');
var bodyParser = require('body-parser');
var Promise = require('bluebird');

var debug = require('debug')('myapp:server');

var ServerFactory = function (mainApp, config) {

  var app = mainApp.app;

  var server = http.createServer(app);

  function start() {
    return new Promise(function (resolve, reject) {
      server.on('error', onError);
      server.on('listening', onListening);
      server.listen(config.port, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(server);
        }
      });
    });
  }

  function stop() {
    server.close();
  }

  /**
   * Event listener for HTTP server "error" event.
   */

  function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    var bind = typeof config.port === 'string' ? 'Pipe ' + config.port : 'Port ' + config.port;

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
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }

  return {
    start: start,
    stop: stop,
    app: app,
    server: server,
  };

};

module.exports = ServerFactory;
