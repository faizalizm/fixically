const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Admin = require('../models/adminModel');
const Fixie = require('../models/fixieModel');
const Member = require('../models/memberModel');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Choose user data to store
      if (req.originalUrl.includes('fixie')) {
        req.fixie = await Fixie.findById(decoded.id).select('-password');
      } else if (req.originalUrl.includes('member')) {
        req.member = await Member.findById(decoded.id).select('-password');
      } else if (req.originalUrl.includes('admin')) {
        req.admin = await Admin.findById(decoded.id).select('-password');
      } else {
        req.admin = await Admin.findById(decoded.id).select('-password');
        req.fixie = await Fixie.findById(decoded.id).select('-password');
        req.member = await Member.findById(decoded.id).select('-password');
      }

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Authorization failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('No token provided');
  }
});

module.exports = { protect };
