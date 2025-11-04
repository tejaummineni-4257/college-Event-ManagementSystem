import Club from "../models/clubModel.js";

export const getClubs = async (req, res) => {
  try {
    const clubs = await Club.find();
    res.json(clubs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch clubs" });
  }
};

export const addClub = async (req, res) => {
  try {
    const newClub = new Club(req.body);
    await newClub.save();
    res.status(201).json(newClub);
  } catch (err) {
    res.status(500).json({ error: "Failed to add club" });
  }
};

export const deleteClub = async (req, res) => {
  try {
    await Club.findByIdAndDelete(req.params.id);
    res.json({ message: "Club deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete club" });
  }
};
