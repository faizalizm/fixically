const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  registerFixie,
  loginFixie,
  getFixie,
} = require('../controllers/FixieController');

router.post('/register', registerFixie);
router.post('/login', loginFixie);
router.get('/me', protect, getFixie);

module.exports = router;
