const express = require('express');
const router = express.Router();

const Event = require('../models/Event');
const News = require('../models/NewsModel');
const Notice = require('../models/NoticeModel');
const Club = require('../models/ClubModel');

/* EVENTS */
router.post('/events', async (req, res) => {
  try {
    const ev = new Event(req.body);
    await ev.save();
    return res.status(201).json(ev);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error creating event' });
  }
});
router.delete('/events/:id', async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    return res.json({ message: 'Event deleted' });
  } catch (err) {
    return res.status(500).json({ message: 'Error deleting event' });
  }
});

/* NEWS */
router.post('/news', async (req, res) => {
  try {
    const n = new News(req.body);
    await n.save();
    return res.status(201).json(n);
  } catch (err) { return res.status(500).json({ message: 'Error creating news' }); }
});
router.delete('/news/:id', async (req, res) => {
  try { await News.findByIdAndDelete(req.params.id); return res.json({ message: 'News deleted' }); }
  catch (err) { return res.status(500).json({ message: 'Error deleting news' }); }
});

/* NOTICES */
router.post('/notices', async (req, res) => {
  try { const n = new Notice(req.body); await n.save(); return res.status(201).json(n); }
  catch (err) { return res.status(500).json({ message: 'Error creating notice' }); }
});
router.delete('/notices/:id', async (req, res) => {
  try { await Notice.findByIdAndDelete(req.params.id); return res.json({ message: 'Notice deleted' }); }
  catch (err) { return res.status(500).json({ message: 'Error deleting notice' }); }
});

/* CLUBS */
router.post('/clubs', async (req, res) => {
  try { const c = new Club(req.body); await c.save(); return res.status(201).json(c); }
  catch (err) { return res.status(500).json({ message: 'Error creating club' }); }
});
router.delete('/clubs/:id', async (req, res) => {
  try { await Club.findByIdAndDelete(req.params.id); return res.json({ message: 'Club deleted' }); }
  catch (err) { return res.status(500).json({ message: 'Error deleting club' }); }
});

module.exports = router;
