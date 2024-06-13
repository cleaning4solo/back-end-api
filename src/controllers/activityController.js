const Activity = require('../models/activityModel');
const Waste = require('../models/wasteModel');

// Create new activity
const createActivity = async (req, res) => {
  try {
    const {
      aktivitas, totalJual, totalEmisiKarbon, statusAktivitas,
    } = req.body;
    const activity = new Activity({
      aktivitas, totalJual, totalEmisiKarbon, statusAktivitas, wasteIds: [],
    });
    await activity.save();
    res.status(201).send(activity);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Add waste entry to an activity
const addWasteToActivity = async (req, res) => {
  try {
    const {
      activityId, jenis, berat, asalLimbah, harga, emisiKarbon,
    } = req.body;
    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).send({ error: 'Activity not found' });
    }
    const waste = new Waste({
      jenis, berat, asalLimbah, harga, emisiKarbon,
    });
    await waste.save();
    activity.wasteIds.push(waste._id);
    activity.totalJual += parseFloat(harga);
    activity.totalEmisiKarbon += parseFloat(emisiKarbon);
    await activity.save();
    res.status(201).send(waste);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getWastesByActivityId = async (req, res) => {
  try {
    const { activityId } = req.params;
    const activity = await Activity.findById(activityId).populate('wasteIds');
    if (!activity) {
      return res.status(404).send({ error: 'Activity not found' });
    }
    res.status(200).send(activity.wasteIds);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find().populate('wasteIds');
    res.status(200).send(activities);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateActivityStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { statusAktivitas } = req.body;

    const activity = await Activity.findByIdAndUpdate(
      id,
      { statusAktivitas },
      { new: true },
    );

    if (!activity) {
      return res.status(404).send({ message: 'Activity not found' });
    }

    res.status(200).send({ message: 'Status updated successfully', activity });
  } catch (error) {
    res.status(500).send(error);
  }
};

const fetchActivityDetails = async (req, res) => {
  try {
    const { id } = req.params;

    // Find activity by ID in the database
    const activity = await Activity.findById(id);

    // Check if activity exists
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    // If activity found, send it in the response
    res.status(200).json(activity);
  } catch (error) {
    console.error('Error fetching activity details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createActivity, addWasteToActivity, getWastesByActivityId, getAllActivities, updateActivityStatus, fetchActivityDetails,
};