const express = require('express');
const router = express.Router();
const userMiddleware = require('../middleware/auth');
const attendenceController = require("../controllers/attendence/attendence.controller")

router.get('/attendence-per-user', userMiddleware.isLoggedIn, attendenceController.userAttendence);
router.get('/attendence-list', userMiddleware.isLoggedIn, attendenceController.listAttendence);

module.exports = router; 