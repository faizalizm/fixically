const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Fixie = require('../models/fixieModel');
const Order = require('../models/orderModel');

// @desc    Register new fixie
// @route   POST /api/fixie/register
// @access  Public
const registerFixie = asyncHandler(async (req, res) => {
  const {
    owner,
    mail,
    password,
    name,
    phone,
    description,
    ssm,
    address,
    state,
    city,
  } = req.body;

  if (
    !owner ||
    !mail ||
    !password ||
    !name ||
    !phone ||
    !description ||
    !ssm ||
    !address ||
    !state ||
    !city
  ) {
    res.status(400); // BAD REQUEST
    throw new Error('Please add all fields');
  }

  // Check if fixie is already registered
  const fixieExist = await Fixie.findOne({ ssm });

  if (fixieExist) {
    res.status(409); // CONFLICT
    throw new Error('SSM Registration Number is already registered');
  }

  // Password hashing
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create Fixie
  const fixie = await Fixie.create({
    owner,
    mail,
    password: hashedPassword,
    name,
    phone,
    description,
    ssm,
    address,
    state,
    city,
    os_support: ['Windows'],
    application: {
      status: 'CREATED',
      create_date: Date.now(),
    },
  });

  if (fixie) {
    res.status(201).json({
      // CREATED
      _id: fixie._id,
      owner: fixie.owner,
      mail: fixie.mail,
      name: fixie.name,
      phone: fixie.phone,
      description: fixie.description,
      ssm: fixie.ssm,
      address: fixie.address,
      state: fixie.state,
      city: fixie.city,
      os_support: fixie.os_support,
      application: fixie.application,
      role: 'Fixie',
      token: generateToken(fixie._id),
    });
  } else {
    res.status(400); // BAD REQUEST
    throw new Error('Invalid fixie data');
  }
});

// @desc    Authenticate a fixie
// @route   POST /api/fixie/login
// @access  Public
const loginFixie = asyncHandler(async (req, res) => {
  const { mail, password } = req.body;

  if (!mail || !password) {
    res.status(400); // BAD REQUEST
    throw new Error('Please add all fields');
  }

  const fixie = await Fixie.findOne({ mail });

  if (fixie && (await bcrypt.compare(password, fixie.password))) {
    res.json({
      _id: fixie._id,
      owner: fixie.owner,
      mail: fixie.mail,
      name: fixie.name,
      phone: fixie.phone,
      description: fixie.description,
      ssm: fixie.ssm,
      address: fixie.address,
      state: fixie.state,
      city: fixie.city,
      os_support: fixie.os_support,
      application: fixie.application,
      role: 'Fixie',
      token: generateToken(fixie._id),
    });
  } else {
    res.status(401); // UNAUTHORIZED
    throw new Error('Invalid credentials');
  }
});

// @desc    Update fixie data
// @route   GET /api/fixie/update?id
// @access  Private
const updateFixie = asyncHandler(async (req, res) => {
  let fixie;
  if (req.query.id) {
    fixie = await Fixie.findById(req.query.id);
  } else {
    fixie = await Fixie.findById(req.user._id);
  }

  if (!fixie) {
    res.status(404); // NOT FOUND
    throw new Error('Fixie not found');
  }

  // Make sure only the fixie can update themselves and Admin
  if (fixie._id.toString() != req.user._id && req.user.role !== 'Admin') {
    res.status(401); // UNAUTHORIZED
    throw new Error('Unauthorized access to fixie data');
  }

  // Password hashing
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
  }

  let updatedFixie;
  if (req.body.application) {
    let status =
      req.body.application.status === 'approve'
        ? 'APPROVED'
        : req.body.application.status === 'reject'
        ? 'REJECTED'
        : '';
    const updateData = {
      $set: {
        'application.status': status,
        'application.result_date': req.body.application.result_date,
      },
    };
    updatedFixie = await Fixie.findByIdAndUpdate(fixie._id, updateData, {
      new: true,
      select: '-password',
    });

    console.log(updateData);
  } else {
    updatedFixie = await Fixie.findByIdAndUpdate(fixie._id, req.body, {
      new: true,
      select: '-password',
    });
  }

  updatedFixie = updatedFixie.toObject();
  updatedFixie.role = req.user.role;
  updatedFixie.token = req.user.token;

  res.status(200).json(updatedFixie);
});

// @desc    Search fixie
// @route   GET /api/fixie/search?id
// @access  Public
const searchFixie = asyncHandler(async (req, res) => {
  if (req.query.id) {
    const selectFields =
      'name mail phone description ssm address state city os_support';

    const fixie = await Fixie.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(req.query.id) },
      },
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'fixie_id',
          as: 'reviews',
        },
      },
      {
        $addFields: {
          average_rating: { $avg: '$reviews.star' },
          review_count: { $size: '$reviews' },
        },
      },
      {
        $project: {
          name: 1,
          mail: 1,
          phone: 1,
          description: 1,
          ssm: 1,
          address: 1,
          state: 1,
          city: 1,
          os_support: 1,
          average_rating: 1,
          review_count: 1,
        },
      },
    ]);

    if (!fixie) {
      res.status(404);
      throw new Error('Fixie not found');
    }

    res.status(200).json(fixie[0]);
  }
  const filter = {};

  const osValues =
    req.query.os && req.query.os.length > 1 ? req.query.os.split(',') : [];

  if (osValues.length > 0) {
    filter['os_support'] = { $in: osValues.map((os) => os) };
  }

  if (req.query.state) {
    filter.state = {
      $regex: new RegExp(req.query.state, 'i'),
    };
  }

  const fixie = await Fixie.aggregate([
    {
      $match: filter,
    },
    {
      $lookup: {
        from: 'reviews',
        localField: '_id',
        foreignField: 'fixie_id',
        as: 'reviews',
      },
    },
    {
      $lookup: {
        from: 'services',
        localField: '_id',
        foreignField: 'fixie_id',
        as: 'services',
      },
    },
    {
      $addFields: {
        average_rating: { $avg: '$reviews.star' },
        review_count: { $size: '$reviews' },
      },
    },
    {
      $project: {
        name: 1,
        description: 1,
        city: 1,
        state: 1,
        os_support: 1,
        average_rating: 1,
        review_count: 1,
        services: 1,
      },
    },
  ]);

  res.status(200).json(fixie);
});

// @desc    Get fixie dashboard information
// @route   GET /api/fixie/dashboard
// @access  Public
const dashboardFixie = asyncHandler(async (req, res) => {
  const today = new Date();

  // Weekly Orders
  const startOfWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay()
  );
  const endOfWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + (6 - today.getDay())
  );
  const weeklyOrders = await Order.aggregate([
    {
      $match: {
        fixie_id: req.user._id,
        createdAt: { $gte: startOfWeek, $lte: endOfWeek },
      },
    },
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
        grandTotal: { $sum: '$total' },
      },
    },
  ]);

  // Daily Orders
  const startOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const endOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1
  );
  const dailyOrders = await Order.aggregate([
    {
      $match: {
        fixie_id: req.user._id,
        createdAt: { $gte: startOfDay, $lt: endOfDay },
      },
    },
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
        grandTotal: { $sum: '$total' },
      },
    },
  ]);

  // Monthly Orders
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const monthlyOrders = await Order.aggregate([
    {
      $match: {
        fixie_id: req.user._id,
        createdAt: { $gte: startOfWeek, $lte: endOfWeek },
      },
    },
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
        grandTotal: { $sum: '$total' },
      },
    },
  ]);

  req.user.monthlyOrders =
    monthlyOrders.length > 0 ? monthlyOrders[0].count : 0;
  req.user.monthlyGrandTotal =
    monthlyOrders.length > 0 ? monthlyOrders[0].grandTotal : 0;
  req.user.weeklyOrders = weeklyOrders.length > 0 ? weeklyOrders[0].count : 0;
  req.user.weeklyGrandTotal =
    weeklyOrders.length > 0 ? weeklyOrders[0].grandTotal : 0;
  req.user.dailyOrders = dailyOrders.length > 0 ? dailyOrders[0].count : 0;
  req.user.dailyGrandTotal =
    dailyOrders.length > 0 ? dailyOrders[0].grandTotal : 0;

  res.status(200).json(req.user);
});

// @desc    Get fixie data
// @route   GET /api/fixie/profile?id
// @access  Private
const profileFixie = asyncHandler(async (req, res) => {
  if (req.user.role === 'Admin') {
    const fixie = await Fixie.findById(req.query.id);
    res.status(200).json(fixie);
  }
  res.status(200).json(req.user);
});

// @desc    Get all fixie
// @route   GET /api/fixie/all?status
// @access  Private
const allFixie = asyncHandler(async (req, res) => {
  if (req.user.role !== 'Admin') {
    res.status(401); // UNAUTHORIZED
    throw new Error('Unauthorized access to data');
  }

  let fixies;
  if (req.query.status) {
    fixies = await Fixie.find({ 'application.status': 'CREATED' });
  } else {
    fixies = await Fixie.find();
  }

  res.status(200).json(fixies);
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = {
  registerFixie,
  loginFixie,
  updateFixie,
  searchFixie,
  profileFixie,
  dashboardFixie,
  allFixie,
};
