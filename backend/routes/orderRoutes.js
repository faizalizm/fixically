const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getOrder,
  setOrder,
  updateOrder,
  deleteOrder,
} = require('../controllers/orderController');

router.route('/').get(protect, getOrder).post(protect, setOrder);
router.route('/:id').delete(protect, deleteOrder).put(protect, updateOrder);

module.exports = router;
