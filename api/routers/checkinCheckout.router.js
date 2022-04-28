const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../../config/database');
const userMiddleware = require('../middleware/auth');
const {userCheckIn,userCheckOut} = require('../controllers//users/checkInCheckout.controller');
// const collect = require('collect.js');

router.post('/checkin', userMiddleware.isLoggedIn, userCheckIn);
router.post('/checkout', userMiddleware.isLoggedIn, userCheckOut);

module.exports = router; 