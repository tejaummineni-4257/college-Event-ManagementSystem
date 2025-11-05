import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
    // Student Information
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    regno: { type: String, required: true },
    department: { type: String, required: true },
    year: { type: String, required: true },
    section: { type: String, required: true },

    // Registration Type
    type: { type: String, enum: ["event", "club"], required: true },

    // Reference to Event or Club
    itemId: { type: mongoose.Schema.Types.ObjectId, required: true },
    itemTitle: { type: String, required: true }, // Store title for easy display

    // Status
    status: { 
      type: String, 
      enum: ["pending", "approved", "rejected"], 
      default: "pending" 
    },
  },
  { timestamps: true }
);

const Registration = mongoose.model("Registration", registrationSchema);
export default Registration;
