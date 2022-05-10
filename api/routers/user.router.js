const router = require("express").Router();
const middleware = require("../middleware/auth")
const {createUser, getUserById, userLogin,userList,editUserDetails} = require("../controllers/users/user.controller");

router.get("/list", userList)
router.post("/edit-user-details", middleware.isLoggedIn,editUserDetails)

module.exports = router; 