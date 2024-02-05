const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  name: { type: String },
  date: { type: String },
  location: { type: String },
  price: { type: Number },
  img: { type: String },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = { Event };
