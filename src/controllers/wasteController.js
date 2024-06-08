const WasteModel = require('../models/wasteModel');
const ActivityModel = require('../models/activityModel');

const getAllWastes = async (req, res) => {
  try {
    const wastes = await WasteModel.find();
    res.status(200).send({ message: 'success', wastes });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const createWastes = async (req, res) => {
  try {
    const { wastes, activityName } = req.body;

    const activity = new ActivityModel({ name: activityName });
    await activity.save();

    const activityId = activity._id;

    const wasteEntries = wastes.map((waste) => ({
      ...waste,
      activityId,
      status: 'drafted', // Set status to 'drafted' when creating
    }));

    const data = await WasteModel.insertMany(wasteEntries);

    res.status(201).send({
      message: 'Waste has been created successfully',
      data,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
    console.error('Error creating waste:', error);
  }
};

const updateWasteById = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedWaste = await WasteModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

    if (!updatedWaste) {
      return res.status(404).send({ message: 'Waste not found' });
    }
    const data = {
      id: updatedWaste._id,
    };
    res.status(201).send({ message: 'Waste updated successfully', data });
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
    console.error('Error updating waste:', error);
  }
};

const deleteWaste = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedWaste = await WasteModel.findByIdAndDelete(id);

    if (!deletedWaste) {
      return res.status(404).send({ message: 'Waste not found' });
    }
    res.status(200).send({ message: 'Waste deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error', error: error.message });
  }
};

const submitWastes = async (req, res) => {
  try {
    await WasteModel.updateMany({ status: 'drafted' }, { status: 'success' });
    res.status(200).send({ message: 'All wastes submitted successfully' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getAllWastes,
  createWastes,
  updateWasteById,
  deleteWaste,
  submitWastes, // Export the new submitWastes method
};
