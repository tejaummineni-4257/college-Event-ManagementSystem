import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Event from "../models/Event.js";

dotenv.config();
connectDB();

const sampleEvents = [
  {
    title: "TechFest 2025",
    description: "Annual technical festival with coding, robotics and gaming contests.",
    date: "2025-11-10",
    club: "Tech Club",
  },
  {
    title: "Cultural Night",
    description: "Dance, music, and fun performances by students.",
    date: "2025-12-01",
    club: "Cultural Club",
  },
];

const importData = async () => {
  try {
    await Event.deleteMany();
    await Event.insertMany(sampleEvents);
    console.log("Sample Events Added!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

importData();
