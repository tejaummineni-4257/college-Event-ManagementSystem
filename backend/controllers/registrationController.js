import Registration from "../models/Registration.js";

// Create a new registration
export const createRegistration = async (req, res) => {
  try {
    const { fullName, email, regno, department, year, section, type, itemId, itemTitle } = req.body;

    // Validation
    if (!fullName || !email || !regno || !department || !year || !section || !type || !itemId || !itemTitle) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    // Check for duplicate registration
    const existingRegistration = await Registration.findOne({
      email,
      itemId,
      type,
    });

    if (existingRegistration) {
      return res.status(400).json({ message: "You are already registered for this " + type });
    }

    // Create new registration
    const newRegistration = new Registration({
      fullName,
      email,
      regno,
      department,
      year,
      section,
      type,
      itemId,
      itemTitle,
      status: "pending",
    });

    await newRegistration.save();
    res.status(201).json({ 
      message: "Registration successful! Awaiting admin approval.", 
      registration: newRegistration 
    });
  } catch (error) {
    console.error("Error creating registration:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// Get all registrations (for admin)
export const getAllRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 });
    res.status(200).json(registrations);
  } catch (error) {
    console.error("Error fetching registrations:", error);
    res.status(500).json({ message: "Server error fetching registrations" });
  }
};

// Update registration status
export const updateRegistrationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const registration = await Registration.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    res.status(200).json({ message: "Status updated successfully", registration });
  } catch (error) {
    console.error("Error updating registration status:", error);
    res.status(500).json({ message: "Server error updating status" });
  }
};

// Delete a registration
export const deleteRegistration = async (req, res) => {
  try {
    const { id } = req.params;
    const registration = await Registration.findByIdAndDelete(id);

    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    res.status(200).json({ message: "Registration deleted successfully" });
  } catch (error) {
    console.error("Error deleting registration:", error);
    res.status(500).json({ message: "Server error deleting registration" });
  }
};
