import Event from "../models/Event.js";

// Get all events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch {
    res.status(500).json({ message: "Error fetching events" });
  }
};

// Add event
export const addEvent = async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json({ message: "Event added successfully" });
  } catch {
    res.status(500).json({ message: "Error adding event" });
  }
};

// Delete event
export const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch {
    res.status(500).json({ message: "Error deleting event" });
  }
};
