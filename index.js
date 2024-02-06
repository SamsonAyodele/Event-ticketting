const express = require("express");
const server = express();
const mongoose = require("mongoose");
const {
  createEvent,
  getAllEvent,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("./controllers/event.controller");
const {
  createTicket,
  getAllTicket,
  getTicketById,
  updateTicket,
  deleteTicket,
} = require("./controllers/ticket.controller");
const {
  createUser,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
} = require("./controllers/user.controller");

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get("/", (req, res) => {
  try {
    res.status(200).json({
      message: "Welcome to our event",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "page not found",
    });
  }
});

server.post("/event", createEvent);
server.get("/event", getAllEvent);
server.get("/event/:eventId", getEventById);
server.put("/event/:eventId", updateEvent);
server.delete("/event/:eventId", deleteEvent);

server.post("/ticket", createTicket);
server.get("/ticket", getAllTicket);
server.get("/ticket/:ticketId", getTicketById);
server.put("/ticket/:ticketId", updateTicket);
server.delete("/ticket/:ticketId", deleteTicket);

server.post("/user", createUser);
server.get("/user", getAllUser);
server.get("/user/:userId", getUserById);
server.put("/user/:userId", updateUser);
server.delete("/user/:userId", deleteUser);

server.listen(4747, async () => {
  console.log("server is listening on port 4747");
  try {
    console.log("server connected successfully");
    await mongoose.connect("mongodb://127.0.0.1:27017/event-ticketing");
    console.log("Database connected successfully");
  } catch (error) {
    console.log(err);
  }
});
