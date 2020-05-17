const express = require('express');
const ticketModel = require('../models/ticket');
const authRouter = require('../routes/authRoute');
const authUtil = require('../oauth/auth');
const app = express();

// get all tickets
app.get('/tickets', async (req, res) => {
  const tickets = await ticketModel.find({});

  try {
    res.json(tickets);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while searching the tickets."
    });
  }
});

// get ticket by ticket id
app.get('/tickets/:id', async (req, res) => {
  const ticket = await ticketModel.findById(req.params.id);

  try {
    res.json(ticket);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while searching the ticket."
    });
  }
});

// get tickets by restaurant id
app.get('/tickets/restaurant/:restaurantId', async (req, res) => {
  const tickets = await ticketModel.find({ restaurantId: req.params.restaurantId });

  try {
    res.json(tickets);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while searching the tickets."
    });
  }
});

// get tickets by restaurant id and ticket type
app.get('/tickets/restaurant/:restaurantId/:type', async (req, res) => {
  const tickets = await ticketModel.find({ restaurantId: req.params.restaurantId, type: req.params.type }).sort('createdTime');

  try {
    res.json(tickets);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while searching the tickets."
    });
  }
});

// get tickets by restaurant id ,ticket type, status
app.get('/tickets/restaurant/:restaurantId/:type/:status', async (req, res) => {
  let status;
  switch (req.params.status) {
    case '1':
      status = 'Queueing';
      break;
    case '2':
      status = 'Calling';
      break;
    case '3':
      status = 'Passed';
      break;
    case '4':
      status = 'Expired';
      break;
    default:
  }
  const tickets = await ticketModel.find({ restaurantId: req.params.restaurantId, type: req.params.type, status: status }).sort('createdTime');

  try {
    res.json(tickets);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while searching the tickets."
    });
  }
});

// get latest ticketNum by resturantId and ticket type
app.get('/tickets/ticketNum/restaurant/:restaurantId/:type', async (req, res) => {
  const tickets = await ticketModel.find({ restaurantId: req.params.restaurantId, type: req.params.type }).sort('-createdTime');
  try {
    if(tickets[0] != null){
      res.json(tickets[0].ticketNum);
    }
    res.status(500).send({
      message: "No ticket with ticket type: "+req.params.type+" and restaurant ID: "+req.params.restaurantId
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while searching the tickets."
    });
  }
});

app.post('/tickets', async (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "Ticket cannot be empty"
    });
  }

  // Create a Ticket
  const ticket = new ticketModel({
    ticketNum: req.body.ticketNum,
    type: req.body.type,
    peopleNum: req.body.peopleNum,
    status: req.body.status,
    restaurantId: req.body.restaurantId,
  });

  // Save Ticket into db
  try {
    const data = await ticket.save();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while creating the ticket."
    });
  }
});

// change ticket status
app.put('/tickets/:id', authRouter.authenticateRequest, authUtil.checkOwner, async (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "Ticket cannot be empty"
    });
  }

  // Save Ticket into db
  try {
    const ticket = await ticketModel.findById(req.params.id);
    if (ticket.restaurantId != null) {
      if (ticket.restaurantId.toString() == res.locals.restaurantId.toString()) {
        const data = await ticketModel.findByIdAndUpdate(req.params.id, req.body, { upsert: true });
        res.send(data);
      }
      else {
        res.status(500).send({
          message: "You don't have access."
        });
      }
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while creating the ticket."
    });
  }
});

app.delete('/tickets/:id', authRouter.authenticateRequest, authUtil.checkOwner, async (req, res) => {
  try {
    const data = await ticketModel.findByIdAndDelete(req.params.id);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while creating the ticket."
    });
  }
});

module.exports = app