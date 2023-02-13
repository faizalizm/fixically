const asyncHandler = require('express-async-handler');

const Order = require('../models/orderModel');
const Service = require('../models/serviceModel');
const Quotation = require('../models/quotationModel');

// @desc    Get order
// @route   GET /api/order
// @access  Private
const getOrder = asyncHandler(async (req, res) => {
  const order = req.fixie
    ? await Order.find({ fixie_id: req.fixie.id })
    : await Order.find({ member_id: req.member.id });
  res.status(200).json(order);
});

// @desc    Set order
// @route   POST /api/order/
// @access  Private
const setOrder = asyncHandler(async (req, res) => {
  if (!req.body.fixie_id) {
    res.status(400);
    throw new Error('Please indicate fixie_id');
  }

  if (!req.body.item) {
    res.status(400);
    throw new Error('Please indicate items in order');
  }

  let orderObj = {
    member_id: req.member.id,
    fixie_id: req.body.fixie_id,
    status: 'CREATED',
  };

  req.body['total'] = 0;
  if (req.body.item) {
    for (element of req.body.item) {
      const service = await Service.findById(element.service_id);
      element['tag'] = service.tag;
      element['brand'] = service.brand;
      element['type'] = service.type;
      element['capacity'] = service.capacity;
      element['speed'] = service.speed;
      element['price'] = service.price;
      req.body['total'] += service.price;
    }

    orderObj['item'] = req.body.item;
    orderObj['total'] = req.body.total;
  } else if (req.body.quote_id) {
    total = Quotation.findById(element.quote_id);
    orderObj['quote_id'] = req.body.quote_id;
  }

  const order = await Order.create(orderObj);

  res.status(200).json(order);
});

// @desc    Update order
// @route   PUT /api/order/:id
// @access  Private
const updateOrder = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(400);
    throw new Error('Order not found');
  }

  // Check for user
  if (!req.fixie && !req.member) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure order belongs to user
  if (
    req.fixie
      ? order.fixie_id.toString() !== req.fixie.id
      : order.member_id.toString() !== req.member.id
  ) {
    res.status(401);
    throw new Error('Unauthorized access to order');
  }

  const updatedOrder = await Order.findByIdAndUpdate(
    req.params.id,
    { status },
    {
      new: true,
    }
  );
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

  await order.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getOrder,
  setOrder,
  updateOrder,
  deleteOrder,
};
