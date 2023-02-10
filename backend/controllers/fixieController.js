const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Fixie = require('../models/fixieModel');

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
  console.log(req.body);
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
      name: fixie.name,
      mail: fixie.mail,
      phone: fixie.phone,
      token: generateToken(fixie._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
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

module.exports = { registerFixie, loginFixie, getFixie };
