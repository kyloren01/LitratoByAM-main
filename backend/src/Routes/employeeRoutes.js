const express = require('express');
const employeeController = require('../Controller/employeeController');
const authMiddleware = require('../Middleware/authMiddleware');
const roleMiddleware = require('../Middleware/roleMiddleware');

const router = express.Router();
router.get('/dashboard', authMiddleware, roleMiddleware('employee'), employeeController.getDashboard);
router.post('/handle-orders', authMiddleware, roleMiddleware('employee'), employeeController.handleOrders);

module.exports = router;