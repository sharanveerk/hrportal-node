const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../config/database');
const {createUser, logoutUser,checkAutToken,loginAdmin} = require("../controllers/users/user.controller");
const userMiddleware = require('../middleware/auth');
const errorResponse = require("../services/errorResponse.service");
const dateTime = require('node-datetime');
// const dt = dateTime.create();
// const created = dt.format('Y-m-d H:M:S')
// const collect = require('collect.js');

router.post('/sign-up', createUser);
router.patch('/check-token', userMiddleware.isLoggedIn,checkAutToken);
router.post('/admin-login', loginAdmin);
router.post('/logout', userMiddleware.isLoggedIn, logoutUser)

module.exports = router; 
