const router = require("express").Router();
const middleware = require("../middleware/auth")
const taskController = require("../controllers/reports/task.controller");
const path = require("path")
const multer  = require('multer')

const storage = multer.diskStorage({

    destination: './public/report',
    filename: (req,file,cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)   
    }
})

const upload = multer({
    storage: storage
})

// tasks type routers
router.post("/task/create", middleware.isLoggedIn,taskController.storeTask)
router.get("/task/user-task-list", middleware.isLoggedIn,taskController.getUserTask)
router.post("/task/create-user-task", upload.single('image'),middleware.isLoggedIn,taskController.storeUserTask)
router.get("/task/dially-user-list", middleware.isLoggedIn,taskController.getUserReportList)

// event routes

module.exports = router; 