const router = require("express").Router()
const leaveTypeController = require("../controllers/leaves/leave_type.controller")
const leaves = require("../controllers/leaves//leave.controller")
const middleware = require("../middleware/auth")
const path = require("path")
const multer  = require('multer')

const storage = multer.diskStorage({

    destination: './public/documents',
    filename: (req,file,cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)   
    }
})

const upload = multer({
    storage: storage
})

router.post('/leave-type/store', middleware.isLoggedIn, leaveTypeController.storeLeaveType)
router.get('/leave-type/view', middleware.isLoggedIn, leaveTypeController.viewLeaveType)
router.put('/leave-type/edit', middleware.isLoggedIn, leaveTypeController.editLeaveType)
router.put('/leave-type/status-change', middleware.isLoggedIn, leaveTypeController.statusChangeLeaveType)


router.post('/leaves/store', middleware.isLoggedIn, upload.single('documents'), leaves.storeLeave)
router.get('/leaves/view', middleware.isLoggedIn, leaves.viewLeave)
router.get('/leaves/list', middleware.isLoggedIn, leaves.listLeave)
router.put('/leaves/status-change', middleware.isLoggedIn, leaves.statusChangedLeave)
router.put('/leaves/edit', middleware.isLoggedIn, upload.single('documents'), leaves.editLeave)
router.put('/leaves/leave-approve', middleware.isLoggedIn, leaves.approveLeave)
router.get('/leaves/user-by-leave', middleware.isLoggedIn, leaves.userByLeave)

router.post('/leave-type/test-upload', upload.single('documents'), leaveTypeController.testUploadImage)


module.exports = router; 