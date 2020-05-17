const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  ticketNum: {
    type: String,
    unique: true,
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
  status: {
    type: String,
    enum: ['Queueing', 'Calling', 'Passed', 'Expired'],
    required: true
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'restaurants'
  }
});

const Ticket = mongoose.model("tickets", TicketSchema);
module.exports = Ticket;