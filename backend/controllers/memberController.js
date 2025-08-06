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
    res.status(400); // BAD REQUEST
    throw new Error('Please add all fields');
  }

  // Check if member is already registered
  const memberExist = await Member.findOne({ mail });

  if (memberExist) {
    res.status(409); // CONFLICT
    throw new Error('Email is already in use');
  }

  // Password hashing
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create Member
  const member = await Member.create({
    name,
    mail,
    password: hashedPassword,
    phone,
  });

  if (member) {
    res.status(201).json({
      // CREATED
      _id: member._id,
      role: 'Member',
      name: member.name,
      mail: member.mail,
      phone: member.phone,
      token: generateToken(member._id),
    });
  } else {
    res.status(400); // BAD REQUEST
    throw new Error('Invalid member data');
  }
});

// @desc    Authenticate a member
// @route   POST /api/member/login
// @access  Public
const loginMember = asyncHandler(async (req, res) => {
  const { mail, password } = req.body;

  if (!mail || !password) {
    res.status(400); // BAD REQUEST
    throw new Error('Please add all fields');
  }

  const member = await Member.findOne({ mail });

  if (member && (await bcrypt.compare(password, member.password))) {
    res.json({
      _id: member._id,
      name: member.name,
      mail: member.mail,
      phone: member.phone,
      role: 'Member',
      token: generateToken(member._id),
    });
  } else {
    res.status(401); // UNAUTHORIZED
    throw new Error('Invalid credentials');
  }
});

// @desc    Update member data
// @route   GET /api/member/update?id
// @access  Private
const updateMember = asyncHandler(async (req, res) => {
  let member;
  if (req.query.id) {
    member = await Member.findById(req.query.id);
  } else {
    member = await Member.findById(req.user._id);
  }

  if (!member) {
    res.status(404); // NOT FOUND
    throw new Error('Member not found');
  }

  // Make sure only the member can update themselves and Admin
  if (member._id.toString() != req.user._id && req.user.role !== 'Admin') {
    res.status(401); // UNAUTHORIZED
    throw new Error('Unauthorized access to member data');
  }

  // Password hashing
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
  }

  let updatedMember = await Member.findByIdAndUpdate(member._id, req.body, {
    new: true,
    select: '-password',
  });

  updatedMember = updatedMember.toObject();
  updatedMember.role = req.user.role;
  updatedMember.token = req.user.token;

  res.status(200).json(updatedMember);
});

// @desc    Get member data
// @route   GET /api/member/profile?id
// @access  Private
const profileMember = asyncHandler(async (req, res) => {
  if (req.user.role === 'Admin') {
    const member = await Member.findById(req.query.id);
    res.status(200).json(member);
  }
  res.status(200).json(req.user);
});

// @desc    Get all member
// @route   GET /api/member/all
// @access  Private
const allMember = asyncHandler(async (req, res) => {
  if (req.user.role !== 'Admin') {
    res.status(401); // UNAUTHORIZED
    throw new Error('Unauthorized access to data');
  }

  const members = await Member.find();
  res.status(200).json(members);
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = {
  registerMember,
  loginMember,
  updateMember,
  profileMember,
  allMember,
};
