const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { username, fullName, email, phone, password, confirmPassword, role } = req.body;

    if (!username || !fullName || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'Please provide required fields' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // normalize role to lowercase
    const normalizedRole = role ? String(role).toLowerCase() : 'student';

    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      fullName,
      email,
      phone,
      password: hashed,
      role: normalizedRole,
    });

    await user.save();
    return res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    console.error('Error in registration:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Please provide email and password' });

    const normalizedRole = role ? String(role).toLowerCase() : null;

    // find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    // if role provided, check it
    if (normalizedRole && user.role !== normalizedRole) {
      return res.status(400).json({ message: 'Incorrect role selected' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid password' });

    // Do not return password
    const userSafe = {
      id: user._id,
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      role: user.role,
    };

    return res.status(200).json({ message: 'Login successful', user: userSafe });
  } catch (err) {
    console.error('Error in login:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
