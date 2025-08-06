const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const nodemailer = require('nodemailer');

const Order = require('../models/orderModel');
const Member = require('../models/memberModel');
const Service = require('../models/serviceModel');
const Quotation = require('../models/quotationModel');

// @desc    Get order
// @route   GET /api/order
// @access  Private
const getOrder = asyncHandler(async (req, res) => {
  let order;

  if (req.headers.role === 'Fixie') {
    order = await Order.aggregate([
      { $match: { fixie_id: req.user._id } },
      {
        $lookup: {
          from: 'services',
          localField: 'item.service_id',
          foreignField: '_id',
          as: 'item',
        },
      },
    ]);
  } else if (req.headers.role === 'Member') {
    order = await Order.aggregate([
      { $match: { member_id: req.user._id } },
      {
        $lookup: {
          from: 'services',
          localField: 'item.service_id',
          foreignField: '_id',
          as: 'item',
        },
      },
    ]);
  }

  res.status(200).json(order);
});

// @desc    Get order statistics
// @route   GET /api/order/stats
// @access  Private
const getOrderStats = asyncHandler(async (req, res) => {
  let stats = {};

  if (req.headers.role == 'Fixie') {
    stats['monthly_order'] = await Order.countDocuments({
      createdAt: {
        $in: [new Date().getFullYear() + '-' + new Date().getMonth()],
      },
    });

    stats['weekly_order'] = await Order.countDocuments([
      {
        $match: {
          createdAt: {
            $gte: new Date(
              new Date().getFullYear(),
              new Date().getMonth(),
              new Date().getDate() - new Date().getDay() + 1
            ),
            $lt: new Date(
              new Date().getFullYear(),
              new Date().getMonth(),
              new Date().getDate() + 6 - new Date().getDay()
            ),
          },
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: '$total',
          },
        },
      },
    ]);

    stats['today_order'] = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(),
            $lt: new Date(),
          },
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: '$total',
          },
        },
      },
    ]);
  }
  // else if (req.headers.role == 'Member') {
  //   stats = await Order.find({ member_id: req.user._id });
  // }

  res.status(200).json(stats);
});

// @desc    Find order
// @route   GET /api/order/search?id
// @access  Private
const findOrder = asyncHandler(async (req, res) => {
  const order = await Order.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(req.query.id) } },
    {
      $lookup: {
        from: 'services',
        localField: 'item.service_id',
        foreignField: '_id',
        as: 'item',
      },
    },
    {
      $lookup: {
        from: 'members',
        localField: 'member_id',
        foreignField: '_id',
        as: 'memberInfo',
      },
    },
    {
      $unwind: '$memberInfo',
    },
    {
      $project: {
        _id: 1,
        fixie_id: 1,
        member_id: 1,
        quotation_id: 1,
        status: 1,
        item: 1,
        total: 1,
        member_name: '$memberInfo.name',
        member_phone: '$memberInfo.phone',
        member_mail: '$memberInfo.mail',
      },
    },
  ]);

  if (!order || order.length === 0) {
    res.status(404); // NOT FOUND
    throw new Error('Order not found');
  }

  res.status(200).json(order[0]);
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
    fixie_id: req.body.fixie_id,
    member_id: req.user._id,
    item: req.body.item,
    total: req.body.total,
    status: 'CREATED',
  };

  // req.body['total'] = 0;
  // if (req.body.item) {
  //   for (element of req.body.item) {
  //     const service = await Service.findById(element.service_id);
  //     element['tag'] = service.tag;
  //     element['brand'] = service.brand;
  //     element['type'] = service.type;
  //     element['capacity'] = service.capacity;
  //     element['speed'] = service.speed;
  //     element['price'] = service.price;
  //     element['quantity'] = service.quantity;
  //     req.body['total'] += service.price * service.quantity;
  //   }

  //   orderObj['item'] = req.body.item;
  //   orderObj['total'] = req.body.total;
  // } else if (req.body.quote_id) {
  //   total = Quotation.findById(element.quote_id);
  //   orderObj['quote_id'] = req.body.quote_id;
  // }

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

  // Make sure order belongs to user
  const isUnauthorized = (req, order) => {
    return (
      order.fixie_id.toString() != req.user._id && req.user.role !== 'Admin'
    );
  };

  if (isUnauthorized(req, order)) {
    res.status(401);
    throw new Error('Unauthorized access to order');
  }

  let newStatus =
    order.status === 'CREATED'
      ? 'RECEIVED'
      : order.status === 'RECEIVED'
      ? 'IN PROGRESS'
      : order.status === 'IN PROGRESS'
      ? 'READY FOR PICKUP'
      : order.status === 'READY FOR PICKUP'
      ? 'COMPLETED'
      : 'CREATED';

  const updatedOrder = await Order.findByIdAndUpdate(
    req.params.id,
    { status: newStatus },
    {
      new: true,
    }
  );

  // if (updatedOrder) {
  //   const transporter = nodemailer.createTransport({
  //     host: 'fixically',
  //     port: 465,
  //     secure: true,
  //     auth: {},
  //     user: 'fixically@gmail.com',
  //     pass: 'Fixically!23',
  //   });

  //   const info = await transporter.sendMail({});

  //   console.log('Message sent : ' + info.messageId);
  // }

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

  // Make sure order belongs to member
  if (order.member_id.toString() != req.user._id) {
    res.status(401);
    throw new Error('Unauthorized access to order');
  }

  await order.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getOrder,
  getOrderStats,
  findOrder,
  setOrder,
  updateOrder,
  deleteOrder,
};
