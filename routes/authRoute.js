const express = require('express');
const OAuth2Server = require('oauth2-server');
const app = express();

app.oauth = new OAuth2Server({
  model: require('../oauth/auth'),
  accessTokenLifetime: 60 * 60 * 24,
  allowBearerTokensInQueryString: true
});

function obtainToken(req, res) {

  var request = new OAuth2Server.Request(req);
  var response = new OAuth2Server.Response(res);

  return app.oauth.token(request, response)
    .then(function (token) {

      res.json(token);
    }).catch(function (err) {

      res.status(err.code || 500).json(err);
    });
}

function authenticateRequest(req, res, next) {

  var request = new OAuth2Server.Request(req);
  var response = new OAuth2Server.Response(res);

  return app.oauth.authenticate(request, response)
    .then(function (token) {
      res.locals.token = token;
      next();
    }).catch(function (err) {

      res.status(err.code || 500).json(err);
    });
}

module.exports = {
  obtainToken: obtainToken,
  authenticateRequest: authenticateRequest,
};