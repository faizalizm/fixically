const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getReview,
  findReview,
  setReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController');

router.route('/search').get(findReview);
router.route('/').get(protect, getReview);
router.route('/').post(protect, setReview);
router.route('/:id').delete(protect, deleteReview).put(protect, updateReview);

module.exports = router;
