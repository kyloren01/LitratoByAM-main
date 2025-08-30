const express = require('express');
const customerController = require('../Controller/customerController');
const authMiddleware = require('../Middleware/authMiddleware');
const roleMiddleware = require('../Middleware/roleMiddleware');

const router = express.Router();




module.exports = router;