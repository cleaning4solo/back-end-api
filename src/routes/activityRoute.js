const express = require('express');

const router = express.Router();
const Activity = require('../models/activityModel');
const Waste = require('../models/wasteModel');

// Create new activity
router.post('/', async (req, res) => {
  try {
    const { aktivitas, rincianAktivitas, wasteIds } = req.body;

    const wastes = await Waste.find({ _id: { $in: wasteIds } });
    const totalJual = wastes.reduce((sum, waste) => sum + waste.harga, 0);
    const totalEmisiKarbon = wastes.reduce((sum, waste) => sum + waste.emisiKarbon, 0);

    const activity = new Activity({
      aktivitas,
      rincianAktivitas,
      totalJual,
      totalEmisiKarbon,
      wasteIds,
    });

    await activity.save();
    res.status(201).send(activity);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all activities
router.get('/', async (req, res) => {
  try {
    const activities = await Activity.find().populate('wasteIds');
    res.status(200).send(activities);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
