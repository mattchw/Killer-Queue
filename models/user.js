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
    enum: ['Customer', 'Owner', 'Admin'],
    required: true
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'restaurants'
  }
});

const User = mongoose.model("users", UserSchema);
module.exports = User;