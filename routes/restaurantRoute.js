const express = require('express');
const restaurantModel = require('../models/restaurant');
const authRouter = require('../routes/authRoute');
const authUtil = require('../oauth/auth');
const app = express();

app.get('/restaurants', async (req, res) => {
  const restaurants = await restaurantModel.find({});

  try {
    res.json(restaurants);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while searching the restaurants."
    });
  }
});

app.get('/restaurants/:id', async (req, res) => {
  const restaurant = await restaurantModel.findById(req.params.id);

  try {
    res.json(restaurant);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while searching the restaurants."
    });
  }
});

app.post('/restaurants', authRouter.authenticateRequest, authUtil.checkAdmin, async (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "Restaurant cannot be empty"
    });
  }

  // Create a Restaurant
  const restaurant = new restaurantModel({
    name: req.body.name,
    type: req.body.type,
    district: req.body.district,
    address: req.body.address,
    food: req.body.food,
    thumbnail: req.body.thumbnail
  });

  console.log(restaurant);

  // Save Restaurant into db
  try {
    const data = await restaurant.save();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while creating the restaurant."
    });
  }
});

app.put('/restaurants/:id', authRouter.authenticateRequest, authUtil.checkAdmin, async (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "Restaurant cannot be empty"
    });
  }

  // Save Restaurant into db
  try {
    const data = await restaurantModel.findByIdAndUpdate(req.params.id, req.body, {upsert: true});
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while creating the restaurant."
    });
  }
});

app.delete('/restaurants/:id', authRouter.authenticateRequest, authUtil.checkAdmin, async (req, res) => {
  // Save Restaurant into db
  try {
    const data = await restaurantModel.findByIdAndDelete(req.params.id);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while creating the restaurant."
    });
  }
});

module.exports = app