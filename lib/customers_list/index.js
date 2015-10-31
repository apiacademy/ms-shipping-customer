var router = require('express').Router({ mergeParams: true });
module.exports = router;

var faker = require("faker");

router.get('/', function(req, res) {

  var context = {};
  context.layout = null;

  context.title = "customers";
  context.base_url = require("config").app.base_url || req.protocol + "://" + req.headers.host;

  var users = [];
  for (var i =0; i<5; i++) {
    users[i] = {};
    users[i].uuid = faker.fake('{{random.uuid}}');
  }
  users[users.length-1].last = true;
  context.users = users;

  var affordances = [
    {rel: "next", url: "/users/{uuid}/profile?since=0e4c2bd8-3d21-4816-a32c-7c94f2e82f06"},
    {rel: context.base_url + "/customer-shipments", url: "/users/{uuid}/shipments"},
  ];
  affordances[affordances.length-1].last = true;
  context.affordances = affordances;

  var template = __dirname + '/views/customers_siren';

  res.set('Content-Type', require("config").app.media_type);

  return res.status(200).render(template, context);

});