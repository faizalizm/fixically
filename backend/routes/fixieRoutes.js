const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  registerFixie,
  loginFixie,
  updateFixie,
  getFixie,
} = require('../controllers/fixieController');

router.post('/register', registerFixie);
router.post('/login', loginFixie);
router.put('/update', protect, updateFixie);
router.get('/me', protect, getFixie);

module.exports = router;
