const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  registerMember,
  loginMember,
  updateMember,
  getMember,
} = require('../controllers/memberController');

router.post('/register', registerMember);
router.post('/login', loginMember);
router.put('/update', protect, updateMember);
router.get('/me', protect, getMember);

module.exports = router;
