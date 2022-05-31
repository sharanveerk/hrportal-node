const express = require('express');
const router = express.Router();
const userMiddleware = require('../middleware/auth');
const attendenceController = require("../controllers/attendence/attendence.controller")

router.get('/attendence-per-user', userMiddleware.isLoggedIn, attendenceController.userAttendence);

module.exports = router; 