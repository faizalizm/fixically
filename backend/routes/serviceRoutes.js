const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getService,
  setService,
  updateService,
  deleteService,
} = require('../controllers/serviceController');

router.route('/').get(protect, getService).post(protect, setService);
router.route('/:id').delete(protect, deleteService).put(protect, updateService);

module.exports = router;
