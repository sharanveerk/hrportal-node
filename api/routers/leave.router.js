const router = require("express").Router()
const leaveTypeController = require("../controllers/leaves/leave_type.controller")
const middleware = require("../middleware/auth")

router.post('/leave-type/store',middleware.isLoggedIn,leaveTypeController.storeLeaveType)
router.get('/leave-type/view',middleware.isLoggedIn,leaveTypeController.viewLeaveType)
router.put('/leave-type/edit',middleware.isLoggedIn,leaveTypeController.editLeaveType)
router.put('/leave-type/status-change',middleware.isLoggedIn,leaveTypeController.statusChangeLeaveType)



module.exports = router; 