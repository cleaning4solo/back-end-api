const express = require('express');

const router = express.Router();
const {
  getAllEvents,
  createEvent,
  getSpecifiedEvent,
  updateEventById,
} = require('../controllers/eventController');

router.route('/events').get(getAllEvents);
router.route('/event').post(createEvent);
router.route('/event/:id').get(getSpecifiedEvent);
router.route('/event/:id').put(updateEventById);
// .put(updateUser).delete(deleteUser);

module.exports = router;
