/**
 * Created by lluis on 10/11/2016.
 */

var container = require('kontainer-di');
var serverConfig = require('./config/server');
var appFactory = require('./di/modules/app');
var socketFactory = require('./di/modules/socket');
var serverFactory = require('./di/modules/server');

// app modules
container.register('serverConfig', [], serverConfig);
container.register('app', [], appFactory);
container.register('server', ['app', 'serverConfig'], serverFactory);
container.register('socket', ['server'], socketFactory);

// data modules

//domain modules

module.exports = container;
