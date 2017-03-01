/**
 * Created by lluis on 10/11/2016.
 */
'use strict';

var Promise = require('bluebird');

var SocketFactory = function (httpServer) {

  var led;
  var socketio = require('socket.io')(httpServer.server);

  function start() {
    return new Promise(function (resolve, reject) {

      //Socket connection handler
      socketio.on('connection', function (socket) {
        console.log('Client connected: ' + socket.id);

        socket.emit('message', 'Connected to server at ' + new Date().toString() + '\n');

        socket.on('bind', function (data) {
          console.log(data);
        });

        socket.on('message', function (data) {
          console.log('from client: ', data);
        });

        setInterval(() => socket.emit('time', new Date().toTimeString()), 1000);

        socket.on('led:on', function (data) {
          console.log('LED ON RECEIVED');
          if (!led) {
            console.log('led ' + led);
            return;
          }

          led.on();
        });

        socket.on('led:off', function (data) {
          console.log('LED OFF RECEIVED');
          if (!led) {
            console.log('led ' + led);
            return;
          }

          led.off();
        });
      });

      if (!socketio) {
        reject();
      } else {
        resolve(socketio);
      }
    });
  }

  function stop() {
    socketio.close();
  }

  return {
    start: start,
    stop: stop,
    socket: socketio,
  };
};

module.exports = SocketFactory;
