const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getQuotation,
  findQuotation,
  setQuotation,
  updateQuotation,
  deleteQuotation,
} = require('../controllers/quotationController');

router.route('/search').get(protect, findQuotation);
router.route('/').get(protect, getQuotation).post(protect, setQuotation);
router
  .route('/:id')
  .delete(protect, deleteQuotation)
  .put(protect, updateQuotation);

module.exports = router;
