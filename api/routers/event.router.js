const router = require("express").Router();
const middleware = require("../middleware/auth")
// const {createUser, getUserById, userLogin,userList,editUserDetails,userUpdateStatus} = require("../controllers/users/user.controller");
const eventController = require("../controllers/event/event.controller");

router.get("/list", eventController.storeEvent)

module.exports = router; 