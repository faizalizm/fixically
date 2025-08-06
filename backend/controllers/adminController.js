const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Admin = require('../models/adminModel');
const Member = require('../models/memberModel');
const Fixie = require('../models/fixieModel');

// @desc    Register new admin
// @route   POST /api/admin/register
// @access  Public
const registerAdmin = asyncHandler(async (req, res) => {
  const { name, mail, password, phone } = req.body;

  if (!name || !mail || !password || !phone) {
    res.status(400); // BAD REQUEST
    throw new Error('Please add all fields');
  }

  // Check if admin is already registered
  const adminExist = await Admin.findOne({ mail });

  if (adminExist) {
    res.status(409); // CONFLICT
    throw new Error('Email is already in use');
  }

  // Password hashing
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create Admin
  const admin = await Admin.create({
    name,
    mail,
    password: hashedPassword,
    phone,
  });

  if (admin) {
    res.status(201).json({
      // CREATED
      _id: admin._id,
      role: 'Admin',
      name: admin.name,
      mail: admin.mail,
      phone: admin.phone,
      token: generateToken(admin._id),
    });
  } else {
    res.status(400); // BAD REQUEST
    throw new Error('Invalid admin data');
  }
});

// @desc    Authenticate an admin
// @route   POST /api/admin/login
// @access  Public
const loginAdmin = asyncHandler(async (req, res) => {
  const { mail, password } = req.body;

  if (!mail || !password) {
    res.status(400); // BAD REQUEST
    throw new Error('Please add all fields');
  }

  const admin = await Admin.findOne({ mail });

  if (admin && (await bcrypt.compare(password, admin.password))) {
    res.json({
      _id: admin._id,
      name: admin.name,
      mail: admin.mail,
      phone: admin.phone,
      role: 'Admin',
      token: generateToken(admin._id),
    });
  } else {
    res.status(401); // UNAUTHORIZED
    throw new Error('Invalid credentials');
  }
});

// @desc    Update admin data
// @route   GET /api/admin/update
// @access  Private
const updateAdmin = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.user._id);

  if (!admin) {
    res.status(404); // NOT FOUND
    throw new Error('Admin not found');
  }

  // Make sure only the admin can update themselves
  if (admin._id.toString() != req.user._id) {
    res.status(401); // UNAUTHORIZED
    throw new Error('Unauthorized access to admin data');
  }

  // Password hashing
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
  }

  let updatedAdmin = await Admin.findByIdAndUpdate(admin._id, req.body, {
    new: true,
    select: '-password',
  });

  updatedAdmin = updatedAdmin.toObject();
  updatedAdmin.role = req.user.role;
  updatedAdmin.token = req.user.token;

  res.status(200).json(updatedAdmin);
});

// @desc    Get admin dashboard information
// @route   GET /api/admin/dashboard
// @access  Public
const dashboardAdmin = asyncHandler(async (req, res) => {
  req.user.memberCount = await Member.countDocuments();
  req.user.fixieCount = await Fixie.countDocuments();

  const today = new Date();
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

  req.user.memberCountWeek = await Member.countDocuments({
    createdAt: { $gte: startOfWeek, $lte: endOfWeek },
  });

  req.user.fixieCountWeek = await Fixie.countDocuments({
    createdAt: { $gte: startOfWeek, $lte: endOfWeek },
  });

  res.status(200).json(req.user);
});

// @desc    Get admin data
// @route   GET /api/admin/profile
// @access  Private
const profileAdmin = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = {
  registerAdmin,
  loginAdmin,
  updateAdmin,
  profileAdmin,
  dashboardAdmin,
};
