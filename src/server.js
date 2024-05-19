const express = require('express');
const database = require('./config/database');
require('dotenv').config();

const app = express();

app.use(express.json());

const port = process.env.PORT || 9000;

database();
app.use('/', require('./routes/eventRoute'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
