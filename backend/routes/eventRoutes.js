import express from "express";
import { getEvents, addEvent, deleteEvent } from "../controllers/eventController.js";

const router = express.Router();

router.get("/", getEvents);        // GET /api/events
router.post("/", addEvent);        // POST /api/events
router.delete("/:id", deleteEvent); // DELETE /api/events/:id

export default router;
