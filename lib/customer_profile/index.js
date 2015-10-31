var router = require('express').Router({ mergeParams: true });
module.exports = router;

var _     = require("lodash"),
    faker = require("faker");

router.get('/', function(req, res) {

  var context = {};
  context.layout = null;

  context.title = "customers";
  context.base_url = require("config").app.base_url || req.protocol + "://" + req.headers.host;

  var randomUser = faker.helpers.createCard(); // random contact card containing many properties

  context.user = _.pick(randomUser, 'name', 'email', 'address', 'phone');
  context.user.uuid = req.params.uuid;

  context.userString = JSON.stringify(context.user);

  var affordances = [
    {rel: context.base_url + "/customer-shipments", url: "/users/{uuid}/shipments"}
  ];
  affordances[affordances.length-1].last = true;
  context.affordances = affordances;

  var entities = [
    {rel: context.base_url + "/current-customer-shipments", url: "/users/" + req.params.uuid + "/shipments"}
  ];
  entities[entities.length-1].last = true;
  context.entities = entities;

  var template = __dirname + '/views/customer_siren';

  res.set('Content-Type', require("config").app.media_type);

  return res.status(200).render(template, context);

});