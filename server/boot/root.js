'use strict';

module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();

    router.get('/', function(req, res) {
        res.json({});
    });


    router.get('/logout', function(req, res) {
        var AccessToken = app.models.AccessToken;
        var token = new AccessToken({id: req.query['access_token']});
        token.destroy();

        res.json({status:"OK"});
    });

  server.use(router);
};
