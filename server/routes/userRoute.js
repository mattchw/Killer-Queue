const express = require('express');
const userModel = require('../models/user');
const authRouter = require('../routes/authRoute');
const authUtil = require('../oauth/auth');
const app = express();

app.get('/users', authRouter.authenticateRequest, authUtil.authorize('Admin'), async (req, res) => {
  try {
    let result = {};
    const users = await userModel.find({});

    result.count = users.length;
    result.users = users;

    return res.sendRes.successRes(res, null, result);
  } catch (err) {
    return res.sendRes.internalServerErrRes(res, err.message || "Error occurred while searching the users.", null);
  }
});

app.get('/users/check', authRouter.authenticateRequest, async (req, res) => {
  try {
    const { token } = res.locals;
    const tokenUser = await userModel.findOne({ username: token.user.username });
    const resUser = {
      username: tokenUser.username,
      type: tokenUser.type,
    }
    res.sendRes.successRes(res, null, resUser);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while searching the user."
    });
  }
});

app.post('/users', async (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "User cannot be empty"
    });
  }

  // Create a User
  const user = new userModel({
    username: req.body.username,
    password: req.body.password,
    phone: req.body.phone,
    email: req.body.email,
    type: req.body.type,
    shop: req.body.shop,
  });

  // Save User into db
  try {
    const data = await user.save();
    res.sendRes.successRes(res, null, data);
  } catch (err) {
    res.sendRes.internalServerErrRes(res, err.message || "Error occurred while creating user.", null);
  }
});

app.put('/users/:id', authRouter.authenticateRequest, authUtil.authorize('Admin'), async (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "User cannot be empty"
    });
  }

  // Save User into db
  try {
    const data = await userModel.findByIdAndUpdate(req.params.id, req.body, {upsert: true});
    res.send(data);
  } catch (err) {
    res.sendRes.internalServerErrRes(res, err.message || "Error occurred while creating user.", null);
  }
});

app.delete('/users/:id', authRouter.authenticateRequest, authUtil.authorize('Admin'), async (req, res) => {
  // Save User into db
  try {
    const data = await userModel.findByIdAndDelete(req.params.id);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while creating the user."
    });
  }
});

module.exports = app