const express = require('express');

const router = express();

const eventRoute = require('./eventRoute');
const blogRoute = require('./blogRoute');
const userRoute = require('./userRoute');

router.use('/events', eventRoute);
router.use('/blogs', blogRoute);
router.use('/users', userRoute);

module.exports = router;
