var server = require('nodebootstrap-server');
var healthcheck = require('connect-service-healthcheck');

server.setup(function(runningApp) {

  runningApp.disable("x-powered-by");

  runningApp.set('view engine', 'handlebars');
  runningApp.engine('handlebars', require('hbs').__express);

  runningApp.use('/users', require('customers_list'));
  runningApp.use('/users/:uuid/shipments', require('customer_shipments'));
  runningApp.use('/users/:uuid/profile', require('customer_profile'));

  // API endpoint attached to root route:
  runningApp.use('/', require('homedoc')); // attach to root route

  // Healthcheck
  var pjson = require('./package.json');
  runningApp.use( '/healthcheck',
    healthcheck({
      componentHealthchecks: function() {
        return {foo: BPromise.resolve('foo is good')};
      },
      memoryName: 'VerySecretUsername',
      memoryPass: 'MuchMoreSecretPassword',
      version: pjson.version
    })
  );
});
