const express = require('express');

const router = express();

const eventRoute = require('./eventRoute');
const blogRoute = require('./blogRoute');

router.use('/events', eventRoute);
router.use('/blogs', blogRoute);

module.exports = router;
