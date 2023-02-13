const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Admin = require('../models/adminModel');

// @desc    Register new admin
// @route   POST /api/admin/register
// @access  Public
const registerAdmin = asyncHandler(async (req, res) => {
  const { name, mail, password, phone } = req.body;

  if (!name || !mail || !password || !phone) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  // Check if admin is already registered
  const adminExist = await Admin.findOne({ mail });

  if (adminExist) {
    res.status(400);
    throw new Error('Email is already in use');
  }

  // Password hashing
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create Admin
  console.log(req.body);
  const admin = await Admin.create({
    name,
    mail,
    password: hashedPassword,
    phone,
  });

  if (admin) {
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      mail: admin.mail,
      phone: admin.phone,
      token: generateToken(admin._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid admin data');
  }
});

// @desc    Authenticate a admin
// @route   POST /api/admin/login
// @access  Public
const loginAdmin = asyncHandler(async (req, res) => {
  const { mail, password } = req.body;

  // Check user mmail
  const admin = await Admin.findOne({ mail });

  if (admin && (await bcrypt.compare(password, admin.password))) {
    res.json({
      _id: admin._id,
      name: admin.name,
      mail: admin.mail,
      phone: admin.phone,
      token: generateToken(admin._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

// @desc    Update admin data
// @route   GET /api/admin/update
// @access  Private
const updateAdmin = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.body.admin_id);

  if (!admin) {
    res.status(401);
    throw new Error('Admin not found');
  }

  // Make sure only the admin can update themselves
  if (admin._id.toString() !== req.admin.id) {
    res.status(401);
    throw new Error('Unauthorized access to admin data');
  }

  // Password hashing
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
  }

  const updatedAdmin = await Admin.findByIdAndUpdate(admin._id, req.body, {
    new: true,
  });
  res.status(200).json(updatedAdmin);
});

// @desc    Get admin data
// @route   GET /api/admin/me
// @access  Private
const getAdmin = asyncHandler(async (req, res) => {
  res.status(200).json(req.admin);
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = { registerAdmin, loginAdmin, updateAdmin, getAdmin };
