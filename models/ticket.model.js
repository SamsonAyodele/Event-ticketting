const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema({
  owner: { type: String },
  typeOfTicket: { type: String },
  event: { type: mongoose.Types.ObjectId, ref: "Event" },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = { Ticket };
