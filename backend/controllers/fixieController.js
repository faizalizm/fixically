const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Fixie = require('../models/fixieModel');
const { query } = require('express');

// @desc    Search fixie
// @route   GET /api/fixie/search
// @access  Public
const searchFixie = asyncHandler(async (req, res) => {
  const osValues =
    req.query.os && req.query.os.length > 1 ? req.query.os.split(',') : [];
  const filter = {
    $and: osValues.map((os) => ({ [`os_support.${os}`]: true })),
  };

  if (req.query.state) {
    filter.state = {
      $regex: req.query.state,
      $options: 'i', // case-insensitive search
    };
  }

  if (req.query.city) {
    filter.city = {
      $regex: req.query.city,
      $options: 'i', // case-insensitive search
    };
  }

  const fixie = await Fixie.find(filter, {
    name: 1,
    description: 1,
    state: 1,
    city: 1,
    os_support: 1,
  });
  res.status(200).json(fixie);
});

// @desc    Register new fixie
// @route   POST /api/fixie/register
// @access  Public
const registerFixie = asyncHandler(async (req, res) => {
  const {
    owner_name,
    name,
    mail,
    password,
    phone,
    description,
    ssm,
    address,
    state,
    city,
    windows,
    mac,
  } = req.body;

  if (
    !owner_name ||
    !name ||
    !mail ||
    !password ||
    !phone ||
    !description ||
    !ssm ||
    !address ||
    !state ||
    !city
  ) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  // Check if fixie is already registered
  const fixieExist = await Fixie.findOne({ ssm });

  if (fixieExist) {
    res.status(400);
    throw new Error('SSM Registration Number is already registered');
  }

  // Password hashing
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create Fixie
  const fixie = await Fixie.create({
    owner_name,
    name,
    mail,
    password: hashedPassword,
    phone,
    description,
    ssm,
    address,
    state,
    city,
    application: {
      status: 'CREATED',
      date: Date.now(),
    },
    os_support: { windows, mac },
  });

  if (fixie) {
    res.status(201).json({
      _id: fixie._id,
      token: generateToken(fixie._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid fixie data');
  }
});

// @desc    Authenticate a fixie
// @route   POST /api/fixie/login
// @access  Public
const loginFixie = asyncHandler(async (req, res) => {
  const { mail, password } = req.body;

  // Check user mmail
  const fixie = await Fixie.findOne({ mail });

  if (fixie && (await bcrypt.compare(password, fixie.password))) {
    res.json({
      _id: fixie._id,
      usertype: 'Fixie',
      owner_name: fixie.owner_name,
      name: fixie.name,
      mail: fixie.mail,
      phone: fixie.phone,
      description: fixie.description,
      ssm: fixie.ssm,
      address: fixie.address,
      state: fixie.state,
      city: fixie.city,
      application: fixie.application,
      os_support: fixie.os_support,
      token: generateToken(fixie._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

// @desc    Update fixie data
// @route   GET /api/fixie/update
// @access  Private
const updateFixie = asyncHandler(async (req, res) => {
  const fixie = await Fixie.findById(req.fixie.id);

  if (!fixie) {
    res.status(401);
    throw new Error('Fixie not found');
  }

  // Make sure only the fixie can update themselves
  if (fixie._id.toString() !== req.fixie.id) {
    res.status(401);
    throw new Error('Unauthorized access to fixie data');
  }

  // Password hashing
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
  }

  const updatedFixie = await Fixie.findByIdAndUpdate(fixie._id, req.body, {
    new: true,
  });

  res.status(200).json(updatedFixie);
});

// @desc    Get fixie data
// @route   GET /api/fixie/me
// @access  Private
const getFixie = asyncHandler(async (req, res) => {
  res.status(200).json(req.fixie);
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = {
  searchFixie,
  registerFixie,
  loginFixie,
  updateFixie,
  getFixie,
};
