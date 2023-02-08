const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Member = require('../models/memberModel');

// @desc    Register new member
// @route   POST /api/member/register
// @access  Public
const registerMember = asyncHandler(async (req, res) => {
  const { name, mail, password, phone } = req.body;

  if (!name || !mail || !password || !phone) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  // Check if member is already registered
  const memberExist = await Member.findOne({ mail });

  if (memberExist) {
    res.status(400);
    throw new Error('Email is already in use');
  }

  // Password hashing
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create Member
  console.log(req.body);
  const member = await Member.create({
    name,
    mail,
    password: hashedPassword,
    phone,
  });

  if (member) {
    res.status(201).json({
      _id: member._id,
      name: member.name,
      mail: member.mail,
      phone: member.phone,
      token: generateToken(member._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid member data');
  }
});

// @desc    Authenticate a member
// @route   POST /api/member/login
// @access  Public
const loginMember = asyncHandler(async (req, res) => {
  const { mail, password } = req.body;

  // Check user mmail
  const member = await Member.findOne({ mail });

  if (member && (await bcrypt.compare(password, member.password))) {
    res.json({
      _id: member._id,
      name: member.name,
      mail: member.mail,
      phone: member.phone,
      token: generateToken(member._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

// @desc    Get member data
// @route   GET /api/member/me
// @access  Private
const getMember = asyncHandler(async (req, res) => {
  res.status(200).json(req.member);
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = { registerMember, loginMember, getMember };
