import express from "express";
import { getNews, addNews, deleteNews } from "../controllers/newsController.js";

const router = express.Router();

router.get("/", getNews);
router.post("/", addNews);
router.delete("/:id", deleteNews);

export default router;
