const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  ticketNum: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['A', 'B', 'C', 'D'],
    required: true,
  },
  peopleNum: {
    type: Number,
  },
  createdTime: {
    type: Date,
    default: Date.now,
  },
  lastUpdate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['Queueing', 'Calling', 'Passed', 'Expired'],
    required: true
  },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'shops'
  },
});

const Ticket = mongoose.model("tickets", TicketSchema);
module.exports = Ticket;