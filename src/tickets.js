const Ticket = require('./Ticket');
const { readFile, writeFile } = require('./utils');

const tickets = Symbol('tickets');

class TicketColletction {
  constructor() {
    (async function () {
      this[tickets] = await readFile();
    }.call(this));
  }

  /**
   * create a new ticket
   * @param {string} username
   * @param {number} price
   * @return {Ticket}
   */
  create(username, price) {
    const ticket = new Ticket(username, price);
    this[tickets].push(ticket);
    writeFile(this[tickets]);
    return ticket;
  }

  /**
   * return all tickets from db
   */
  find() {
    return this[tickets];
  }

  /**
   * find a single ticket by Id
   * @param {string} ticketId
   * @return {Ticket} ticket
   */
  findTicketById(ticketId) {
    const ticket = this[tickets].find(
      /**
       * @param {Ticket}
       */
      (ticket) => ticket.id === ticketId
    );

    return ticket;
  }

  /**
   * find tickets by username
   * @param {string} username
   * @return {Ticket[]}
   */
  findTicketsByUsername(username) {
    const userTickets = this[tickets].filter(
      /**
       * @param {Ticket} ticket
       */

      (ticket) => ticket.username === username
    );

    return userTickets;
  }

  /**
   * update ticket by id
   * @param {string} tickedId
   * @param {{username: string, price: number}} ticketBody
   * @return {Ticket}
   */
  updateById(tickedId, ticketBody) {
    const ticket = this.findTicketById(tickedId);
    if (ticket) {
      ticket.username = ticketBody.username ?? ticket.username;
      ticket.price = ticketBody.price ?? ticket.price;
    }

    writeFile(this[tickets]);
    return ticket;
  }

  /**
   * delete ticket by id
   * @param {string} ticketId
   * @return {boolean}
   */
  deleteTicketById(ticketId) {
    const index = this[tickets].findIndex(
      /**
       * @param {Ticket} ticket
       */
      (ticket) => ticket.id === ticketId
    );

    if (index === -1) {
      return false;
    } else {
      this[tickets].splice(index, 1);
      writeFile(this[tickets]);
      return true;
    }
  }

  /**
   * create bulk tickets
   * @param {string} username
   * @param {number} price
   * @param {number} quantity
   * @return {Ticket[]}
   */
  createBulkTickets(username, price, quantity) {
    let result = [];
    for (let i = 0; i < quantity; i++) {
      const ticket = this.create(username, price);
      result.push(ticket);
    }

    writeFile(this[tickets]);

    return result;
  }

  /**
   * Bulk Ticket update by username
   * @param {string} username
   * @param {{username: string, price: number}} ticketBody
   * @return {Ticket[]}
   */
  updateBulkTickets(username, ticketBody) {
    const userTickets = this.findTicketsByUsername(username);
    const updatedTickets = userTickets.map(
      /**
       * @param {Ticket} ticket
       */
      (ticket) => this.updateById(ticket.id, ticketBody)
    );

    writeFile(this[tickets]);

    return updatedTickets;
  }

  /**
   * bulk delete by username
   * @param {string} username
   * @return {boolean[]}
   */
  deleteBulkTickets(username) {
    const userTickets = this.findTicketsByUsername(username);
    const deletedResult = userTickets.map(
      /**
       * @param {Ticket} ticket
       */
      (ticket) => this.deleteTicketById(ticket.id)
    );

    writeFile(this[tickets]);

    return deletedResult;
  }

  /**
   * Find winners
   * @param {number} winnerCount
   * @return {Ticket[]}
   */
  draw(winnerCount) {
    const winners = new Array(winnerCount);
    let winnerIndex = 0;

    while (winnerIndex < winnerCount) {
      let ticketIndex = Math.floor(Math.random() * this[tickets].length);
      if (!winners.includes(ticketIndex)) {
        winners[winnerIndex] = this[tickets][ticketIndex];
        winnerIndex++;
      }
    }

    return winners;
  }
}

const ticketColletion = new TicketColletction();

module.exports = ticketColletion;
