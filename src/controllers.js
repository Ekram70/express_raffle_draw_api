const ticketColletion = require('./tickets');

// ticket selling controllers

const sellSingleTicket = (req, res) => {
  const { username, price } = req.body;
  const ticket = ticketColletion.create(username, price);

  res.status(201).json({
    message: 'Ticket created successfully',
    ticket,
  });
};

const sellBulkTicket = (req, res) => {
  const { username, price, quantity } = req.body;
  const tickets = ticketColletion.createBulkTickets(username, price, quantity);

  res.status(201).json({
    message: 'Tickets created succedssfully',
    tickets,
  });
};

// find tickets controller
const findAll = (req, res) => {
  const tickets = ticketColletion.find();
  console.log(tickets);
  res.status(200).json({
    items: tickets,
    total: tickets.length,
  });
};

const findById = (req, res) => {
  const { id } = req.params;
  const ticket = ticketColletion.findTicketById(id);

  if (!ticket) {
    return res.status(404).json({
      message: 'Ticket Not Found',
    });
  } else {
    res.status(200).json(ticket);
  }
};

const findByUsername = (req, res) => {
  const { username } = req.params;
  const tickets = ticketColletion.findTicketsByUsername(username);
  res.status(200).json({
    items: tickets,
    total: tickets.length,
  });
};

// update controllers

const updateById = (req, res) => {
  const { id } = req.params;
  const ticket = ticketColletion.updateById(id, req.body);

  if (!ticket) {
    return res.status(404).json({
      message: 'Ticket Not Found',
    });
  } else {
    res.status(200).json(ticket);
  }
};

const updateByUsername = (req, res) => {
  const { username } = req.params;
  const tickets = ticketColletion.updateBulkTickets(username, req.body);
  res.status(200).json({
    items: tickets,
    total: tickets.length,
  });
};

// delete controllers
const deletedById = (req, res) => {
  const { id } = req.params;
  const isDeleted = ticketColletion.deleteTicketById(id);
  if (isDeleted) {
    res.status(204).send();
  }

  res.status(400).json({
    message: 'Delete operation failed',
  });
};

const deleteByUsername = (req, res) => {
  const { username } = req.params;
  ticketColletion.deleteBulkTickets(username);
  res.status(204).send();
};

// draw controller
const drawWinners = (req, res) => {
  const { wc } = req.query ?? 3;
  const winners = ticketColletion.draw(wc);
  res.status(200).json({
    winners,
  });
};

module.exports = {
  sellSingleTicket,
  sellBulkTicket,
  findAll,
  findById,
  findByUsername,
  updateById,
  updateByUsername,
  deletedById,
  deleteByUsername,
  drawWinners,
};
