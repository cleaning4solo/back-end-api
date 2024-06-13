const express = require('express');

const router = express.Router();
const {
  createWaste,
  getAllWastes,
  getWasteById,
  updateWaste,
  deleteWaste,
} = require('../controllers/wasteController');

router.post('/', createWaste);
router.get('/', getAllWastes);
router.get('/:id', getWasteById);
router.put('/:id', updateWaste);
router.delete('/:id', deleteWaste);

module.exports = router;
