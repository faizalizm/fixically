const asyncHandler = require('express-async-handler');

const Order = require('../models/orderModel');
const Member = require('../models/memberModel');

// @desc    Get order
// @route   GET /api/order
// @access  Private
const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.find({ member_id: req.member.id });
  res.status(200).json(order);
});

// @desc    Set order
// @route   POST /api/order/
// @access  Private
const setOrder = asyncHandler(async (req, res) => {
  if (!req.body.order_status) {
    res.status(400);
    throw new Error('Please add a text field');
  }

  const order = await Order.create({
    member_id: req.member.id,
    order_status: req.body.order_status,
  });
  // fixie_id: req.fixie.id,

  res.status(200).json(order);
});

// @desc    Update order
// @route   PUT /api/order/:id
// @access  Private
const updateOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(400);
    throw new Error('Order not found');
  }

  // Check for member
  if (!req.member) {
    res.status(401);
    throw new Error('Member not found');
  }

  // Make sure order belongs to member
  if (order.member_id.toString() !== req.member._id) {
    res.status(401);
    throw new Error('Unauthorized access to order');
  }

  const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedOrder);
});

// @desc    Delete order
// @route   DELETE /api/order/:id
// @access  Private
const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(400);
    throw new Error('Order not found');
  }

  // Check for member
  if (!req.member) {
    res.status(401);
    throw new Error('Member not found');
  }

  // Make sure order belongs to member
  if (order.member_id.toString() !== req.member.id) {
    res.status(401);
    throw new Error('Unauthorized access to order');
  }

  const removedOrder = await order.remove();
  // Order.deleteOne({ _id: req.params.id }, function(err, result) {
  //   if (err) {
  //     console.err(err);
  //   } else {
  //     res.json(result);
  //   }
  // });
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getOrder,
  setOrder,
  updateOrder,
  deleteOrder,
};
