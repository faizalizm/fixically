const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getReview,
  setReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController');

router.route('/').get(protect, getReview).post(protect, setReview);
router.route('/:id').delete(protect, deleteReview).put(protect, updateReview);

module.exports = router;
