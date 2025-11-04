import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Notice", noticeSchema);
