import express from "express";
import { getClubs, addClub, deleteClub } from "../controllers/clubController.js";

const router = express.Router();

router.get("/", getClubs);
router.post("/", addClub);
router.delete("/:id", deleteClub);

export default router;
