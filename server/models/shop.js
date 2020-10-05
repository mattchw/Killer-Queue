const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema({
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
  items: [{
    name: String,
    description: String,
    price: Number,
  }],
  tableFor2: {
    type: Number,
  },
  tableFor4: {
    type: Number,
  },
  tableFor6: {
    type: Number,
  },
  tableForMore: {
    type: Number,
  },
  averageTimeInHalfHour: {
    type: Number,
  },
  thumbnail: String,
  lastUpdate: {
    type: Date,
    default: Date.now
  }
  
});

const Shop = mongoose.model("shops", ShopSchema);
module.exports = Shop;