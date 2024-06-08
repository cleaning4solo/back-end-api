const WasteItemModel = require('../models/wasteitemModel');

const createWaste = async (req, res) => {
  try {
    const data = await WasteItemModel.create(req.body);
    res.status(201).send(
      {
        message: 'Waste has ben created successfully',
        data,
      },
    );
  } catch (error) {
    res.status(500).send({ message: error });
    console.error('Error creating waste:', error);
  }
};

const updateWasteById = async (req, res) => {
  try {
    const { id } = req.params;
    const { berat } = req.body;

    if (berat === undefined) {
      return res.status(400).send({ message: 'berat field is required' });
    }

    const updatedWaste = await WasteItemModel.findByIdAndUpdate(
      id,
      { berat },
      { new: true, runValidators: true },
    );

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

    const deletedWaste = await WasteItemModel.findByIdAndDelete(id);

    if (!deletedWaste) {
      return res.status(404).send({ message: 'Waste not found' });
    }
    res.status(200).send({ message: 'Waste deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error', error: error.message });
  }
};

module.exports = {
  createWaste,
  updateWasteById,
  deleteWaste,
};
