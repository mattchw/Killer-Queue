const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  type: {
    type: String,
    enum: ['Customer', 'ShopOwner', 'Admin'],
    required: true
  },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'shops'
  }
});

const User = mongoose.model("users", UserSchema);
module.exports = User;