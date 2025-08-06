const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  registerMember,
  loginMember,
  updateMember,
  profileMember,
  allMember,
} = require('../controllers/memberController');

router.get('/profile', protect, profileMember);
router.get('/all', protect, allMember);
router.post('/register', registerMember);
router.post('/login', loginMember);
router.put('/update', protect, updateMember);

module.exports = router;
