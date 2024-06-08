const mongoose = require('mongoose');

const WasteSchema = new mongoose.Schema(
  {
    jenis: {
      type: String,
      required: true,
    },
    berat: {
      type: Number,
      required: true,
    },
    asalLimbah: {
      type: String,
      required: true,
    },
    harga: {
      type: Number,
      required: true,
    },
    emisiKarbon: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    activityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Activity', // Reference to the Activity model
    },
  },
);

const wasteModel = mongoose.model('Waste', WasteSchema);
module.exports = wasteModel;
