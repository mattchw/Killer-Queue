const mongoose = require('mongoose');
const crypto = require('crypto');

const clientModel = require('../models/client'),
  tokenModel = require('../models/token'),
  userModel = require('../models/user');

function authorize(roles = []) {
  // roles param can be a single role string (e.g. Role.User or 'User') 
  // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return [
    // authorize based on user role
    (req, res, next) => {
      const { token } = res.locals;

      if (roles.length && token) {
        for (let role of roles) {
          if (role === token.user.type) {
            // authentication and authorization successful
            return next();
          }
        }
        // user's role is not authorized
        return res.sendRes.unauthorizedErrRes(res, "Unauthorized. You don't have access." , null);
      }
      return res.sendRes.internalServerErrRes(res, "Authorization Error" , null);
    }
  ];
}

async function checkAdmin(req, res, next) {
  const { token } = res.locals;
  const tokenUser = await userModel.find({ username: token.user.username });

  // check user type
  if (tokenUser[0].type != null) {
    if (tokenUser[0].type == 'Admin')
      next();
    else {
      res.status(500).send({
        message: "You don't have access."
      });
    }
  } else {
    res.status(500).send({
      message: "You don't belong to any user type."
    });
  }
}

async function checkOwner(req, res, next) {
  const { token } = res.locals;
  const tokenUser = await userModel.find({ username: token.user.username });

  // check user type
  if (tokenUser[0].type != null) {
    if (tokenUser[0].type == 'Owner') {
      res.locals.shop = tokenUser[0].shop;
      next();
    }
    else {
      res.status(500).send({
        message: "You don't have access."
      });
    }
  } else {
    res.status(500).send({
      message: "You don't belong to any user type."
    });
  }
}

var getAccessToken = function (token, callback) {

  tokenModel.findOne({
    accessToken: token
  }).lean().exec((function (callback, err, token) {

    if (!token) {
      console.error('Token not found');
    }

    callback(err, token);
  }).bind(null, callback));
};

var getClient = function (clientId, clientSecret, callback) {

  clientModel.findOne({
    clientId: clientId,
    clientSecret: clientSecret
  }).lean().exec((function (callback, err, client) {

    if (!client) {
      console.error('Client not found');
    }

    callback(err, client);
  }).bind(null, callback));
};

var saveToken = function (token, client, user, callback) {

  token.client = {
    id: client.clientId
  };

  token.user = {
    username: user.username || null,
    phone: user.phone || null,
    email: user.email || null,
    shop: user.shop || null,
    type: user.type || null,
  };

  var tokenInstance = new tokenModel(token);
  tokenInstance.save((function (callback, err, token) {

    if (!token) {
      console.error('Token not saved');
    } else {
      token = token.toObject();
      delete token._id;
      delete token.__v;
    }

    callback(err, token);
  }).bind(null, callback));
};

/*
 * Method used only by password grant type.
 */

var getUser = function (username, password, callback) {

  userModel.findOne({
    username: username,
    password: crypto.createHash('sha256').update(password).digest('hex')
  }).lean().exec((function (callback, err, user) {

    if (!user) {
      console.error('User not found');
    }

    callback(err, user);
  }).bind(null, callback));
};

/*
 * Method used only by client_credentials grant type.
 */

var getUserFromClient = function (client, callback) {

  clientModel.findOne({
    clientId: client.clientId,
    clientSecret: client.clientSecret,
    grants: 'client_credentials'
  }).lean().exec((function (callback, err, client) {

    if (!client) {
      console.error('Client not found');
    }

    callback(err, {
      username: ''
    });
  }).bind(null, callback));
};

/*
 * Methods used only by refresh_token grant type.
 */

var getRefreshToken = function (refreshToken, callback) {

  tokenModel.findOne({
    refreshToken: refreshToken
  }).lean().exec((function (callback, err, token) {

    if (!token) {
      console.error('Token not found');
    }

    callback(err, token);
  }).bind(null, callback));
};

var revokeToken = function (token, callback) {

  tokenModel.deleteOne({
    refreshToken: token.refreshToken
  }).exec((function (callback, err, results) {

    var deleteSuccess = results && results.deletedCount === 1;

    if (!deleteSuccess) {
      console.error('Token not deleted');
    }

    callback(err, deleteSuccess);
  }).bind(null, callback));
};

/**
 * Export model definition object.
 */

module.exports = {
  authorize: authorize,
  checkAdmin: checkAdmin,
  checkOwner: checkOwner,
  getAccessToken: getAccessToken,
  getClient: getClient,
  saveToken: saveToken,
  getUser: getUser,
  getUserFromClient: getUserFromClient,
  getRefreshToken: getRefreshToken,
  revokeToken: revokeToken
};