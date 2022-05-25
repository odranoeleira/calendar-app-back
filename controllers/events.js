const { response } = require("express");
const Event = require("../models/Event");

const getEvents = async (req, res = response) => {
  const events = await Event.find().populate("user", "name");

  res.status(200).json({ ok: true, events });
};

const createEvent = async (req, res = response) => {
  const event = new Event(req.body);
  try {
    event.user = req.uid;
    const eventSaved = await event.save();
    res.status(201).json({ ok: true, event: eventSaved });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ ok: false, msg: "Comuniquese con el administrador" });
  }
};

const updateEvent = async (req, res = response) => {
  const id = req.params.id;
  try {
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ ok: false, msg: "Event do not exists" });
    }

    if (event.user.toString() !== req.uid) {
      return res.status(401).json({ ok: false, msg: "Event unauthorized" });
    }

    const newEvent = { ...req.body, user: req.uid };
    //El new hace que devuelva el documento actualizado.
    const updatedEvent = await Event.findByIdAndUpdate(id, newEvent, {
      new: true,
    });

    res.status(200).json({ ok: true, event: updatedEvent });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ ok: false, msg: "Comuniquese con el administrador" });
  }
};

const deleteEvent = async (req, res = response) => {
  const id = req.params.id;
  try {
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ ok: false, msg: "Event do not exists" });
    }

    if (event.user.toString() !== req.uid) {
      return res.status(401).json({ ok: false, msg: "Event unauthorized" });
    }

    await Event.findByIdAndDelete(id);

    res.status(200).json({ ok: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ ok: false, msg: "Comuniquese con el administrador" });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
