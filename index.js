var path = require('path'),
  express = require('express'),
  router = express.Router();




// my custom API call
router.post('/wav/:id', function(req, res) {
  res.send({ok: true});
});

// setup Envoy to 
//     - log incoming requests
//     - switch off demo app
//     - serve out our static files
//     - add our routes
var opts = {
  logFormat: 'dev',
  databaseName: 'audiomark',
  usersDatabaseName: 'audiomarkusers',
  production: true,
  static: path.join(__dirname, './public'),
  router: router
};

// start up the web server
//var envoy = require('cloudant-envoy')(opts);
var envoy = require('../envoy')(opts);
envoy.events.on('listening', function() {
  console.log('[OK]  Server is up');
});