const mongoose = require('mongoose');

const WasteItemSchema = new mongoose.Schema(
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
  },
);

const wasteitemModel = mongoose.model('WasteItem', WasteItemSchema);
module.exports = wasteitemModel;
