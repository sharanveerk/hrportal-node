const router = require("express").Router();
const middleware = require("../middleware/auth")
// const {createUser, getUserById, userLogin,userList,editUserDetails,userUpdateStatus} = require("../controllers/users/user.controller");
const userController = require("../controllers/users/user.controller");

router.get("/list", userController.userList)
router.post("/edit-user-details", middleware.isLoggedIn,userController.editUserDetails)
router.post("/user-update-status", middleware.isLoggedIn,userController.userUpdateStatus)
router.get("/test-permission", middleware.isLoggedIn,userController.checkPermissionTest)

module.exports = router; 