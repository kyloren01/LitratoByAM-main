const express = require('express');
const router = express.Router();
const authController = require('../Controller/authController');
const authMiddleware = require('../Middleware/authMiddleware');



router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/profile', authMiddleware, authController.getProfile);

module.exports = router;