const express = require('express');

const router = express();

const eventRoute = require('./eventRoute');
const blogRoute = require('./blogRoute');
const userRoute = require('./userRoute');
const wasteRoute = require('./wasteRoute');
const wasteitemRoute = require('./wasteitemRoute');
const volunteerRoute = require('./volunteerRoute');

router.use('/events', eventRoute);
router.use('/blogs', blogRoute);
router.use('/users', userRoute);
router.use('/wastes', wasteRoute);
router.use('/wasteItems', wasteitemRoute);
router.use('/volunteer', volunteerRoute);

module.exports = router;
