const express = require('express');

const router = express.Router();
const {
  createWaste,
  updateWasteById,
  deleteWaste,
} = require('../controllers/wasteitemController');

router.route('/').post(createWaste);
router.route('/:id').put(updateWasteById);
router.route('/:id').delete(deleteWaste);

module.exports = router;
