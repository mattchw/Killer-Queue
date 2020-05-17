const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  type: {
    type: String,
    required: true,
    lowercase: true
  },
  district: {
    type: String,
    required: true,
    lowercase: true
  },
  address: {
    type: String,
    required: true,
    lowercase: true
  },
  food: [{
    name: String,
    description: String,
    price: Number,
  }],
  thumbnail: String,
  lastUpdate: {
    type: Date,
    default: Date.now
  }
});

const Restaurant = mongoose.model("restaurants", RestaurantSchema);
module.exports = Restaurant;