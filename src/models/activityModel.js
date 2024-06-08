const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const ActivityModel = mongoose.model('Activity', ActivitySchema);
module.exports = ActivityModel;
