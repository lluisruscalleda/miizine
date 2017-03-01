// *** main dependencies *** //
const loopback = require('loopback');
const boot = require('loopback-boot');

//const diContainer = require('./di-container-config'); // DI container

(function Server() {
  // const appConfig = require('./config/main-config.js');
  // const errorConfig = require('./config/error-config.js');

  const app = module.exports = loopback();

  // *** load environment variables *** //
  require('dotenv').config();

  // appConfig.init(app);
  // errorConfig.init(app);

  app.start = function AppStart() {
    // start the web server
    return app.listen(() => {
      app.emit('started');
      const baseUrl = app.get('url').replace(/\/$/, '');
      console.log('Web server listening at: %s', baseUrl);

      if (app.get('loopback-component-explorer')) {
        const explorerPath = app.get('loopback-component-explorer').mountPath;
        console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
      }
    });
  };

  // Bootstrap the application, configure models, datasources and middleware.
  // Sub-apps like REST API are mounted via boot scripts.
  boot(app, __dirname, (err) => {
    if (err) throw err;

    // start the server if `$ node server.js`
    if (require.main === module) {
      //app.start();
      app.io = require('socket.io')(app.start());
      app.io.on('connection', function (socket) {
        console.log('a user connected');
        socket.on('chat message', function (msg) {
          console.log('message: ' + msg);
          app.io.emit('chat message', msg);
        });

        socket.on('disconnect', function () {
          console.log('user disconnected');
        });
      });
    }
  });

  var path = require('path');

  //List here the paths you do not want to be redirected
  // to the angular application (scripts, stylesheets, templates, loopback REST API, ...)
  var ignoredPaths = ['/vendor', '/css', '/js', '/views', '/api'];

  app.all('/*', function (req, res, next) {
    //Redirecting to index only the requests that do not start with ignored paths
    if (!startsWith(req.url, ignoredPaths))
      res.sendFile('index.html', { root: path.resolve(__dirname, '..', 'client') });
    else
      next();
  });

  function startsWith(string, array) {
    for (var i = 0; i < array.length; i++)
      if (string.startsWith(array[i]))
        return true;
    return false;
  }
}());
