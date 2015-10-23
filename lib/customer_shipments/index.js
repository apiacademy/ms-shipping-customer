var router = require('express').Router({ mergeParams: true });
module.exports = router;

router.get('/', function(req, res) {

  var context = {};
  context.layout = null;

  context.title = "shipments";
  context.base_url = require("config").app.base_url;

  var shipments = [];
  var min = 10000000000000000000000000000000; // We need 32-character tracking numbers
  var max = 99999999999999999999999999999999; // We need 32-character tracking numbers
  for (var i =0; i<10; i++) {
    shipments[i] = {};
    shipments[i].number = getRandomTrackingNumber(32);
  }
  shipments[shipments.length-1].last = true;
  context.shipments = shipments;

  var affordances = [
    {rel: context.base_url + "/this-customer-profile", url: "/users/{uuid}/profile"},
  ];
  affordances[affordances.length-1].last = true;
  context.affordances = affordances;

  var template = __dirname + '/views/shipments_siren';

  res.set('Content-Type', require("config").app.media_type);

  return res.status(200).render(template, context);

});

// 32-characters is too long and JS converts to "scientific notation" so we need a trick
function getRandomTrackingNumber(length) {
  var numOfIterations = Math.floor(length / 5);
  var randomTenDigit = 0,
      buildUp = "";

  for (var i = 0; i < numOfIterations; i++) {
    randomTenDigit = getRandomInt(10000, 99999);
    buildUp = buildUp + randomTenDigit.toString();
  }

  var remainder = length % 5;
  var random = getRandomInt(10^remainder, 10^(remainder-1));

  buildUp = buildUp + remainder.toString();

  return buildUp;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}