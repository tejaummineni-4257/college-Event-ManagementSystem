import mongoose from "mongoose";

const clubSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Club", clubSchema);
