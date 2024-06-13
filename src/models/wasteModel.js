const mongoose = require('mongoose');

const wasteSchema = new mongoose.Schema({
  jenis: { type: String, required: true },
  berat: { type: Number, required: true },
  asalLimbah: { type: String, required: true },
  harga: { type: Number, required: true },
  emisiKarbon: { type: Number, required: true },
}, {
  timestamps: true,
});

const Waste = mongoose.model('Waste', wasteSchema);

module.exports = Waste;
