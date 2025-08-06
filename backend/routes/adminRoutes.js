const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  registerAdmin,
  loginAdmin,
  updateAdmin,
  profileAdmin,
  dashboardAdmin,
} = require('../controllers/adminController');

router.get('/profile', protect, profileAdmin);
router.get('/dashboard', protect, dashboardAdmin);
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.put('/update', protect, updateAdmin);

module.exports = router;
