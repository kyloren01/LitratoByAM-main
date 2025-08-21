const express = require('express');
const router = express.Router();
const authController = require('../Controller/authController');
const authMiddleware = require('../Middleware/authMiddleware');


router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/getProfile', authMiddleware, authController.getProfile);
// Update profile for authenticated user
router.put('/updateProfile', authMiddleware, authController.updateProfile);

module.exports = router;