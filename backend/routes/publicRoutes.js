const express = require('express');
const router = express.Router();

const Event = require('../models/Event');
const News = require('../models/NewsModel');
const Notice = require('../models/NoticeModel');
const Club = require('../models/ClubModel');

router.get('/events', async (req, res) => {
  try { const items = await Event.find().sort({ createdAt: -1 }); res.json(items); }
  catch (err) { res.status(500).json({ message: 'Error getting events' }); }
});
router.get('/news', async (req, res) => {
  try { const items = await News.find().sort({ createdAt: -1 }); res.json(items); }
  catch (err) { res.status(500).json({ message: 'Error getting news' }); }
});
router.get('/notices', async (req, res) => {
  try { const items = await Notice.find().sort({ createdAt: -1 }); res.json(items); }
  catch (err) { res.status(500).json({ message: 'Error getting notices' }); }
});
router.get('/clubs', async (req, res) => {
  try { const items = await Club.find().sort({ createdAt: -1 }); res.json(items); }
  catch (err) { res.status(500).json({ message: 'Error getting clubs' }); }
});

module.exports = router;
