const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  searchFixie,
  registerFixie,
  loginFixie,
  updateFixie,
  profileFixie,
  dashboardFixie,
  allFixie,
} = require('../controllers/fixieController');

router.get('/profile', protect, profileFixie);
router.get('/dashboard', protect, dashboardFixie);
router.get('/all', protect, allFixie);
router.get('/search', searchFixie);
router.post('/register', registerFixie);
router.post('/login', loginFixie);
router.put('/update', protect, updateFixie);

module.exports = router;
