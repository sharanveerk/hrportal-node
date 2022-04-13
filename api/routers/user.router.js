const {createUser} = require("../controllers/users/user.controller");
const router = require("express").Router();

router.post("/",createUser);
module.exports = router; 