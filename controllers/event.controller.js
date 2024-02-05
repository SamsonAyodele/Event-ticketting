const { Event } = require("../models/event.model");

const createEvent = async (req, res) => {
  try {
    let eventExist = await Event.findOne({ name: req.body.name });
    if (eventExist) {
      res.status(400).json({
        message: `${eventExist.name} already exist`,
      });
    }
    let event = new Event(req.body);
    await event.save();
    res.status(200).json({
      message: "event created successfully",
      data: event,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllEvent = async (req, res) => {
  try {
    let event = await Event.find({});
    res.status(200).json({
      message: "event fetched successfully",
      data: event,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "server error",
    });
  }
};

const getEventById = async (req, res) => {
  try {
    let eventId = req.params.eventId;
    let event = await Event.findById(eventId);
    if (!event) {
      res.status(404).json({
        message: "event not found",
      });
    } else {
      res.status(200).json({
        message: "successfully",
        data: event,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "server error",
    });
  }
};

const updateEvent = async (req, res) => {
  try {
    let eventId = req.params.eventId;
    let eventExist = await Event.findById(eventId);
    if (!eventExist) {
      res.status(400).json({
        message: "Event does not exist",
      });
    }
    let event = await Event.findByIdAndUpdate(
      eventId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      message: "Event update successfully",
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
};

const deleteEvent = async (req, res) => {
  try {
    let eventId = req.params.eventId;
    let eventExist = await Event.findById(eventId);
    if (!eventExist) {
      res.status(400).json({
        message: "Event does not exist",
      });
    }
    let event = await Event.findOneAndDelete(eventId);
    res.status(200).json({
      message: "event deleted successfully",
      data: event,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "server error",
    });
  }
};

module.exports = {
  createEvent,
  getAllEvent,
  getEventById,
  updateEvent,
  deleteEvent,
};
