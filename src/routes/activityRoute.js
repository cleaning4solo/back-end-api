const express = require('express');

const router = express.Router();
const {
  createActivity, addWasteToActivity, getAllActivities, getWastesByActivityId, updateActivityStatus, fetchActivityDetails,
} = require('../controllers/activityController');

router.post('/', createActivity);
router.post('/:activityId/waste', addWasteToActivity);
router.get('/wastes/byActivity/:activityId', getWastesByActivityId);
router.patch('/:id/status', updateActivityStatus);
router.get('/:id', fetchActivityDetails);
router.get('/', getAllActivities);

module.exports = router;
