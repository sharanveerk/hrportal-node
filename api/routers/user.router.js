const {createUser, getUserById, userLogin} = require("../controllers/users/user.controller");
const router = require("express").Router();
// const collect = require('collect.js');

// let collection = collect(User.createUser);
// collection.dd();

router.post("/", createUser);
// router.get("/:id", getUserById);
router.get("/login", userLogin);

module.exports = router; 