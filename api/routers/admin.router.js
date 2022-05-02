const router = require("express").Router();
const {fetchAllUser,assignRole} = require("../controllers/admin/assign_role.controller");
const collect = require('collect.js');
const userMiddleware = require('../middleware/auth');
// let collection = collect(User.createUser);
// collection.dd();

router.get("/fetch-users", fetchAllUser);
router.post("/assign", userMiddleware.isLoggedIn,assignRole);

module.exports = router; 