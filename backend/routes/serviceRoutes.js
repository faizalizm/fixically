const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getService,
  searchService,
  findService,
  setService,
  updateService,
  deleteService,
} = require('../controllers/serviceController');

router.route('/search').get(searchService);
router.route('/').get(protect, getService).post(protect, setService);
router
  .route('/:id')
  .get(protect, findService)
  .delete(protect, deleteService)
  .put(protect, updateService);

module.exports = router;
