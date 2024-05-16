const mongoose = require('mongoose');
require('dotenv').config();

const databaseUrl = process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://localhost:27017/db_clean4solo';

const database = mongoose.connect(databaseUrl);
module.exports = database;
