const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getOrder,
  getOrderStats,
  findOrder,
  setOrder,
  updateOrder,
  deleteOrder,
} = require('../controllers/orderController');

router.route('/search').get(protect, findOrder);
router.route('/').get(protect, getOrder);
router.route('/stats').get(protect, getOrderStats);
router.route('/').post(protect, setOrder);
router.route('/:id').delete(protect, deleteOrder).put(protect, updateOrder);

module.exports = router;
