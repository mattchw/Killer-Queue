const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    appointmentNum: {
    type: String,
    required: true
  },
   peopleNum: {
    type: Number,
  },
  createdTime: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['Valid', 'Confirmed', 'Fulfilled', 'Cancelled', 'Expired'],
    required: true
  },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'shops'
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'clients'
  },
  appointmentDate: {
    type: Date,
  },
  
});

const Appintment = mongoose.model("appointments", AppointmentSchema);
module.exports = Appintment;