const express = require('express');
const shopModel = require('../models/shop');
const authRouter = require('./authRoute');
const authUtil = require('../oauth/auth');
const app = express();

app.get('/shops', async (req, res) => {
  const shops = await shopModel.find({});

  try {
    res.json(shops);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while searching the shops."
    });
  }
});

app.get('/shops/:id', async (req, res) => {
  const shop = await shopModel.findById(req.params.id);

  try {
    res.json(shop);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while searching the shops."
    });
  }
});

app.post('/shops', authRouter.authenticateRequest, authUtil.authorize('Admin'), async (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "shop cannot be empty"
    });
  }

  // Create a shop
  const shop = new shopModel({
    name: req.body.name,
    type: req.body.type,
    district: req.body.district,
    address: req.body.address,
    items: req.body.items,
    thumbnail: req.body.thumbnail
  });

  console.log(shop);

  // Save shop into db
  try {
    const data = await shop.save();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while creating the shop."
    });
  }
});

app.put('/shops/:id', authRouter.authenticateRequest, authUtil.authorize('Admin'), async (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "shop cannot be empty"
    });
  }

  // Save shop into db
  try {
    const data = await shopModel.findByIdAndUpdate(req.params.id, req.body, {upsert: true});
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while creating the shop."
    });
  }
});

app.delete('/shops/:id', authRouter.authenticateRequest, authUtil.authorize('Admin'), async (req, res) => {
  // Save shop into db
  try {
    const data = await shopModel.findByIdAndDelete(req.params.id);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while creating the shop."
    });
  }
});

module.exports = app