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
import registrationRoutes from "./routes/registrationRoutes.js"; // register + view

dotenv.config();

const app = express();

// ✅ Middleware
app.use(express.json());

// ✅ CORS setup (only for local development)
app.use(
  cors({
    origin: "http://localhost:3000", // your frontend (React) runs here
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// ✅ MongoDB Connection (local or Atlas)
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ API Routes
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/clubs", clubRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/registrations", registrationRoutes);

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("🎯 College Event Management Backend is running locally...");
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
