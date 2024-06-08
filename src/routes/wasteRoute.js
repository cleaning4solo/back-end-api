const express = require('express');

const router = express.Router();
const {
  getAllWastes,
  createWastes,
  updateWasteById,
  deleteWaste,
  submitWastes,
} = require('../controllers/wasteController');

router.route('/').get(getAllWastes);
router.route('/').post(createWastes);
router.route('/:id').put(updateWasteById);
router.route('/:id').delete(deleteWaste);
router.route('/').post(submitWastes);

module.exports = router;
