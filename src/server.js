const express = require('express');
const database = require('./config/database');

const app = express();

const port = process.env.PORT || 9000;

database();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
