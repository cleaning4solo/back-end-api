const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  aktivitas: { type: String, required: true },
  totalJual: { type: Number, required: true, default: 0 },
  totalEmisiKarbon: { type: Number, required: true, default: 0 },
  statusAktivitas: { type: String, required: true, default: 'draft' },
  wasteIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Waste', required: true }],
}, {
  timestamps: true,
});

const ActivityModel = mongoose.model('Activity', ActivitySchema);
module.exports = ActivityModel;
