var path = require('path'),
  express = require('express'),
  crypto = require('crypto'),
  CryptoJS = require("crypto-js"),
  uuid = require('uuid'),
  cloudant = null,
  tokensdb = null,
  envoydb = null,
  cfenv = require('cfenv'),
  appEnv = cfenv.getAppEnv(),
  appurl = (appEnv.app.application_uris)?'https://'+appEnv.app.application_uris[0]:'http://localhost:'+appEnv.port,
  router = express.Router();

var encrypt = function(str, key) {
  return CryptoJS.AES.encrypt(str, key).toString();
};

var decrypt = function(str, key) {
  var bytes  = CryptoJS.AES.decrypt(str, key);
  return bytes.toString(CryptoJS.enc.Utf8);
};

var getOrCreateUser = function(profile, callback) {

  /* { id: '10154548735446449',
       username: undefined,
       displayName: 'Glynn Bird'
    } */
  var user_id = parseInt(profile.id).toString(36);
  var name = profile.displayName;

  envoy.auth.getUser(user_id, function (err, data) {
    if (err) {
      var meta = {
        user_id: user_id,
        name: name
      };
      console.log("created new user", meta);
      var password = uuid.v4();
      meta.password = encrypt(password, process.env.CLIENT_ID);
      envoy.auth.newUser(user_id, password, meta, function (err, data) {
        envoy.auth.getUser(user_id, function(err, data) {
          callback(err, data);
        });
      })
    } else {
      console.log("User already exists", data);
      callback(err, data);
    }
  });
};

// passport
var passport = require('passport'), 
  TwitterStrategy = require('passport-twitter').Strategy;

var opts = {
  consumerKey: process.env.CLIENT_ID,
  consumerSecret: process.env.CLIENT_SECRET,
  callbackURL: appurl + '/_twitter/callback'
};
passport.use(new TwitterStrategy(opts , function(accessToken, refreshToken, profile, done) {
   getOrCreateUser(profile, done);
}));

router.get('/_twitter', passport.authenticate('twitter', {session: false}));
router.get('/_twitter/callback', passport.authenticate('twitter', {session: false}), function(req, res) {
  var data = req.user;
  console.log('user', req.user)
  data._id = uuid.v4();
  data.ts = new Date().getTime() + 1000*60*60;
  delete data._rev;
  tokensdb.insert(data, function (err, data) {
    res.redirect('/#?token=' + data.id)
  });
});


// returns the sha1 of a string
var sha1 = function(string) {
  return crypto.createHash('sha1').update(string).digest('hex');
};

// my custom API call
router.get('/w/:userid/:wavid', function(req, res) {
  var id = sha1(req.params.userid) + '-' + req.params.wavid;
  envoydb.get(id, function(err, data) {
    if (err) {
      return res.status(404).send('Not found');
    }
    envoydb.attachment.get(id, 'audio.wav').pipe(res);
  });
});

// my custom API call
router.get('/_token/:token', function(req, res) {
  tokensdb.get(req.params.token, function(err, data) {
    if (err) {
      res.send({ok: false});
    } else {
      tokensdb.destroy(data._id, data._rev);
      if (data.ts > new Date().getTime()) {
        data.meta.password = decrypt(data.meta.password, process.env.CLIENT_ID);
        res.send(data);
      } else {
        res.send({ok: false, msg: 'out of date'});
      }
    }
  });
});

// setup Envoy to 
//     - log incoming requests
//     - switch off demo app
//     - serve out our static files
//     - add our routes
var opts = {
  logFormat: 'combined',
  databaseName: 'audiomark',
  usersDatabaseName: 'audiomarkusers',
  production: true,
  static: path.join(__dirname, './public'),
  router: router,
  port: appEnv.port,
  middleware: [ passport.initialize() ]
};

// start up the web server
//var envoy = require('cloudant-envoy')(opts);
var envoy = require('../envoy')(opts);
//var envoy = require('../envoy')(opts);
envoy.events.on('listening', function() {
  // setup tokens database 
  cloudant = envoy.cloudant;
  cloudant.db.create('audiomarktokens');
  tokensdb = cloudant.db.use('audiomarktokens');
  envoydb = cloudant.db.use('audiomark');
  console.log('[OK]  Server is up', appurl);
});