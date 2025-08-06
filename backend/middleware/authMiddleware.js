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

      // Check role
      if (req.headers.role) {
        if (req.headers.role == 'Fixie') {
          req.user = await Fixie.findById(decoded.id).select('-password');
        } else if (req.headers.role == 'Member') {
          req.user = await Member.findById(decoded.id).select('-password');
        } else if (req.headers.role == 'Admin') {
          req.user = await Admin.findById(decoded.id).select('-password');
        } else {
          throw new Error('Invalid role provided');
        }
      } else {
        throw new Error('No role provided');
      }

      if (!req.user) {
        throw new Error(`User with the role doesn't exist`);
      }

      req.user = req.user.toObject();
      req.user.role = req.headers.role;
      req.user.token = token;

      next();
    } catch (error) {
      console.log(error);
      res.status(401); // UNAUTHORIZED
      if (error.message === 'No role provided') {
        throw new Error('No role provided');
      } else if (error.message === 'Invalid role provided') {
        throw new Error('Invalid role provided');
      } else if (error.message === `User with the role doesn't exist`) {
        throw new Error(`User with the role doesn't exist`);
      } else {
        throw new Error('Authorization failed');
      }
    }
  }

  if (!token) {
    res.status(401); // UNAUTHORIZED
    throw new Error('No token provided');
  }
});

module.exports = { protect };
