const express = require('express');
const router = express.Router();
const {
  registerMember,
  loginMember,
  getMember,
} = require('../controllers/memberController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerMember);
router.post('/login', loginMember);
router.get('/me', protect, getMember);

module.exports = router;
