// *** main dependencies *** //
const loopback = require('loopback');

var AppFactory = function () {

  const app = module.exports = loopback();

  return {
    app: app,
  };

};

module.exports = AppFactory;
