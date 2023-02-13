const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  registerAdmin,
  loginAdmin,
  updateAdmin,
  getAdmin,
} = require('../controllers/adminController');

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.put('/update', protect, updateAdmin);
router.get('/me', protect, getAdmin);

module.exports = router;
