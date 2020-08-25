const express = require('express');
const ticketModel = require('../models/ticket');
const shopModel = require('../models/shop');
const authRouter = require('../routes/authRoute');
const authUtil = require('../oauth/auth');
const app = express();

async function clearCallingTickets(ticket) {
  // check in db if there's a CALLING ticket. If yes, switch its status to PASSED
  const callingTickets = await ticketModel.find({ type: ticket.type, status: "Calling", shop: ticket.shop.toString() }).sort('-createdTime');

  if (callingTickets.length > 0) {
    // use for loop, switch the status to PASSED
    for (let callingTicket of callingTickets) {
      await ticketModel.findByIdAndUpdate(callingTicket._id, { status: 'Passed', lastUpdate: Date.now() }, { upsert: true });
    }
  }
}

async function clearPassedTickets(ticket, passedNum) {
  // check if number of PASSED tickets is > passedNum
  const passedTickets = await ticketModel.find({ type: ticket.type, status: "Passed", shop: ticket.shop.toString() }).sort('createdTime');
  if (passedTickets.length > passedNum) {
    // use for loop, switch the status to EXPIRED
    const promises = passedTickets.slice(0, passedTickets.length - passedNum).map(async (item) => {
      return await ticketModel.findByIdAndUpdate(item._id, { status: 'Expired', lastUpdate: Date.now() }, { upsert: true });
    })
    await Promise.all(promises);
  }
}

// get all tickets
app.get('/tickets', async (req, res) => {
  try {
    let result = {};
    const tickets = await ticketModel.find({});

    result.count = tickets.length;
    result.tickets = tickets;

    res.sendRes.successRes(res, null, result);
  } catch (err) {
    res.sendRes.internalServerErrRes(res, err.message || "Error occurred while searching the ticket.", null);
  }
});

// get ticket by ticket id
app.get('/tickets/:id', async (req, res) => {
  try {
    const ticket = await ticketModel.findById(req.params.id);
    res.sendRes.successRes(res, null, ticket);
  } catch (err) {
    res.sendRes.internalServerErrRes(res, err.message || "Error occurred while searching the ticket.", null);
  }
});

// get tickets by shop id
app.get('/tickets/shop/:shop', async (req, res) => {
  try {
    let result = {};
    const tickets = await ticketModel.find({ shop: req.params.shop });

    result.count = tickets.length;
    result.tickets = tickets;

    res.sendRes.successRes(res, null, result);
  } catch (err) {
    res.sendRes.internalServerErrRes(res, err.message || "Error occurred while searching the ticket.", null);
  }
});

// get tickets by shop id and ticket type
app.get('/tickets/shop/:shop/:type', async (req, res) => {
  try {
    let result = {};
    const tickets = await ticketModel.find({ shop: req.params.shop, type: req.params.type }).sort('createdTime');

    result.count = tickets.length;
    result.tickets = tickets;

    res.sendRes.successRes(res, null, result);
  } catch (err) {
    res.sendRes.internalServerErrRes(res, err.message || "Error occurred while searching the ticket.", null);
  }
});

// get tickets by shop id ,ticket type, status
app.get('/tickets/shop/:shop/:type/:status', async (req, res) => {
  try {
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
    let result = {};
    const tickets = await ticketModel.find({ shop: req.params.shop, type: req.params.type, status: status }).sort('createdTime');

    result.count = tickets.length;
    result.tickets = tickets;

    res.sendRes.successRes(res, null, result);
  } catch (err) {
    res.sendRes.internalServerErrRes(res, err.message || "Error occurred while searching the ticket.", null);
  }
});

// get latest ticketNum by resturantId and ticket type
app.get('/tickets/ticketNum/shop/:shop/:type', async (req, res) => {
  try {
    const tickets = await ticketModel.find({ shop: req.params.shop, type: req.params.type }).sort('-createdTime');
    if (tickets.length > 0) {
      res.sendRes.successRes(res, null, tickets[0].ticketNum);
    }
    else {
      res.sendRes.internalServerErrRes(res, `No ticket with ticket type: ${req.params.type} and shop ID: ${req.params.shop}`, null);
    }
  } catch (err) {
    res.sendRes.internalServerErrRes(res, err.message || "Error occurred while searching the tickets.", null);
  }
});

app.post('/tickets', async (req, res) => {
  // Validate request
  if (!req.body.shop || !req.body.type || !req.body.peopleNum) {
    return res.sendRes.badRequestRes(res, "Missing mandatory fields", null);
  }

  try {
    let ticketNum = "0001";
    const tickets = await ticketModel.find({ shop: req.body.shop, type: req.body.type }).sort('-createdTime');

    if (tickets[0] != null) {
      let tmp = Number(tickets[0].ticketNum.slice(1, 5)) + 1;
      ticketNum = ("000" + tmp).slice(-4);
    }

    // Create a Ticket
    const ticket = new ticketModel({
      ticketNum: req.body.type + ticketNum,
      type: req.body.type,
      peopleNum: req.body.peopleNum,
      status: "Queueing",
      shop: req.body.shop,
    });

    // Save Ticket into db

    const data = await ticket.save();
    const result = await shopModel.populate(data, {
      path: "shop",
      select: [
        'name',
        'type',
        'district',
        'thumbnail'
      ]
    });
    return res.sendRes.successRes(res, null, result);
  } catch (err) {
    return res.sendRes.internalServerErrRes(res, err.message || "Error occurred while creating the ticket.", null);
  }
});

// change ticket status freely
app.put('/tickets/:id', authRouter.authenticateRequest, authUtil.authorize(['Owner', 'Admin']), async (req, res) => {
  // Validate request
  if (!req.body) {
    return res.sendRes.badRequestRes(res, "Ticket cannot be empty", null);
  }

  // Save Ticket into db
  try {
    const ticket = await ticketModel.findById(req.params.id);
    if (ticket.shop != null) {
      if (ticket.shop.toString() == res.locals.token.user.shop.toString()) {
        req.body.lastUpdate = Date.now();
        const result = await ticketModel.findByIdAndUpdate(req.params.id, req.body, { upsert: true });
        return res.sendRes.successRes(res, null, result);
      }
      else {
        return res.sendRes.unauthorizedErrRes(res, "Unauthorized. You don't have access.", null);
      }
    }
  } catch (err) {
    return res.sendRes.internalServerErrRes(res, "Error occurred while updating the ticket.", null);
  }
});

// update ticket status as CALLING, allowing only 1 CALLING ticket and automatically switch previous CALLING ticket's status as PASSED
app.put('/tickets/calling/:id', authRouter.authenticateRequest, authUtil.authorize('Owner'), async (req, res) => {
  // Validate request
  if (!req.body) {
    return res.sendRes.badRequestRes(res, "Ticket cannot be empty", null);
  }

  // Save Ticket into db
  try {
    const ticket = await ticketModel.findById(req.params.id);
    if (ticket.shop != null) {
      if (ticket.shop.toString() == res.locals.token.user.shop.toString()) {
        if (ticket.status != "Calling") {

          await Promise.all([
            clearCallingTickets(ticket),
            clearPassedTickets(ticket, 5)
          ])

          // update current ticket's status to CALLING
          await ticketModel.findByIdAndUpdate(req.params.id, { status: 'Calling', lastUpdate: Date.now() }, { upsert: true });

          return res.sendRes.successRes(res, `The status of ticket(${ticket._id}) has been successfully changed to CALLING.`, null);
        } else {
          return res.sendRes.badRequestRes(res, `The ticket(${ticket._id}) is already in CALLING status.`, null);
        }

      }
      else {
        return res.sendRes.unauthorizedErrRes(res, "Unauthorized. You don't have access.", null);
      }
    }
  } catch (err) {
    return res.sendRes.internalServerErrRes(res, err.message || "Error occurred while updating the ticket.", null);
  }
});

app.delete('/tickets/:id', authRouter.authenticateRequest, authUtil.authorize('Owner'), async (req, res) => {
  try {
    const ticket = await ticketModel.findByIdAndDelete(req.params.id);
    return res.sendRes.successRes(res, `The ticket(${ticket._id}) has been successfully deleted.`, null);
  } catch (err) {
    return res.sendRes.internalServerErrRes(res, err.message || "Error occurred while deleting the ticket.", null);
  }
});

module.exports = app