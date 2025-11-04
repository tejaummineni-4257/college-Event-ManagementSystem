import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Import routes
import userRoutes from "./routes/userRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import clubRoutes from "./routes/clubRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";
import noticeRoutes from "./routes/noticeRoutes.js";
 // single file handles both register + view

dotenv.config();

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ API Routes
app.use("/api/users", userRoutes);          // user login/register
app.use("/api/events", eventRoutes);        // events CRUD
app.use("/api/clubs", clubRoutes);          // clubs CRUD
app.use("/api/news", newsRoutes);           // news CRUD
app.use("/api/notices", noticeRoutes);      // notices CRUD

// ✅ Default route for testing
app.get("/", (req, res) => {
  res.send("🎯 College Event Management Backend is running...");
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
