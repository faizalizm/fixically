const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  registerMember,
  loginMember,
  getMember,
} = require('../controllers/memberController');

router.post('/register', registerMember);
router.post('/login', loginMember);
router.get('/me', protect, getMember);

module.exports = router;
