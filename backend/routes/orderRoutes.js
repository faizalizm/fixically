const express = require('express');
const router = express.Router();
const {
  getOrder,
  setOrder,
  updateOrder,
  deleteOrder,
} = require('../controllers/orderController');

router.route('/').get(getOrder).post(setOrder);
router.route('/:id').delete(deleteOrder).put(updateOrder);

module.exports = router;
