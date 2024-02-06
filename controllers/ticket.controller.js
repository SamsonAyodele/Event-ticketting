const { Ticket } = require("../models/ticket.model");

const createTicket = async (req, res) => {
  try {
    let ticketExist = await Ticket.findOne({
      ticketOwner: req.body.ticketOwner,
    });
    if (ticketExist) {
      res.status(404).json({
        message: "Ticket already exist",
      });
    }
    let ticket = new Ticket(req.body);
    await ticket.save();
    res.status(200).json({
      message: "ticket created successfully",
      data: {
        owner: ticket.owner,
        typeOfTicket: ticket.typeOfTicket,
        event: ticket.event.ref,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "server error",
    });
  }
};

const getAllTicket = async (req, res) => {
  try {
    let ticket = await Ticket.find({}).populate("event");
    res.status(200).json({
      message: "successful",
      data: ticket,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const getTicketById = async (req, res) => {
  try {
    let ticketId = req.params.ticketId;
    let ticket = await Ticket.findById(ticketId).populate("event");
    if (!ticket) {
      res.status(404).json({
        message: "ticket not found",
      });
    } else {
      res.status(200).json({
        message: "successful",
        data: ticket,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
};

const updateTicket = async (req, res) => {
  try {
    let ticketId = req.params.ticketId;
    let ticketExist = await Ticket.findById(ticketId);
    if (!ticketExist) {
      res.status(400).json({
        message: "ticket not found",
      });
    }
    let ticket = await Ticket.findByIdAndUpdate(
      ticketId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      message: "ticket updated successfully",
      data: ticket,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "server error",
    });
  }
};

const deleteTicket = async (req, res) => {
  try {
    let ticketId = req.params.ticketId;
    let ticketExist = await Ticket.findById(ticketId);
    if (!ticketExist) {
      res.status(400).json({
        message: "ticket not found",
      });
    }
    let ticket = await Ticket.findByIdAndDelete(ticketId);
    res.status(200).json({
      message: "ticket deleted successfully",
      data: ticket,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTicket,
  getAllTicket,
  getTicketById,
  updateTicket,
  deleteTicket,
};
