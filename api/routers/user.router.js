const router = require("express").Router();
const middleware = require("../middleware/auth")
const {createUser, getUserById, userLogin,userList,editUserDetails,userUpdateStatus} = require("../controllers/users/user.controller");

router.get("/list", userList)
router.post("/edit-user-details", middleware.isLoggedIn,editUserDetails)
router.post("/user-update-status", middleware.isLoggedIn,userUpdateStatus)

module.exports = router; 