var router = require('express').Router({ mergeParams: true });
module.exports = router;

router.get('/', function(req, res) {

  var context = {};
  context.layout = null;

  context.title = "Home Document";
  context.base_url = require("config").app.base_url || req.protocol + "://" + req.headers.host;

  var affordances = [
    {rel: "/users-you-can-view", class: "item", url: "/users"},
    // {rel: "/customer-profile", class: "item", url: "/users/{uuid}/profile"},
    // {rel: "/customer-shipments", class: "item", url: "/users/{uuid}/shipments"},
    {rel: "/shipment-details", class: "item", url: "/shipments/{tracking-id}"},
  ];
  affordances[affordances.length-1].last = true;
  context.affordances = affordances;

  var template = __dirname + '/views/homedoc_siren';

  res.set('Content-Type', require("config").app.media_type);

  return res.status(200).render(template, context);

});