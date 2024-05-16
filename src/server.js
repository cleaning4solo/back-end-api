const express = require('express');
const database = require('./config/database');

const app = express();

const port = process.env.PORT || 9000;

database
  .then(() => {
    console.log('connected to database');
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
