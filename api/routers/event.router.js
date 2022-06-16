const router = require("express").Router();
const middleware = require("../middleware/auth")
const eventTypeController = require("../controllers/event/event_type.controller");
const eventController = require("../controllers/event/event.controller");
const announcementController = require("../controllers/event/announcement.controller");

const path = require("path")
const multer  = require('multer')

const storage = multer.diskStorage({

    destination: './public/events',
    filename: (req,file,cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)   
    }
})

const upload = multer({
    storage: storage
})


// event type routes
router.post("/event_type/create", middleware.isLoggedIn,eventTypeController.storeEventType)
router.get("/event_type/view", middleware.isLoggedIn,eventTypeController.viewById)
router.get("/event_type/list", middleware.isLoggedIn,eventTypeController.eventTypeList)
router.put("/event_type/edit", middleware.isLoggedIn,eventTypeController.editTypeList)
router.put("/event_type/active-deactive", middleware.isLoggedIn,eventTypeController.activeDeactiveTypeList)

// event routes
router.post("/events/create", upload.single('banner'),middleware.isLoggedIn,eventController.storeEvent)
router.get("/events/list", middleware.isLoggedIn,eventController.listEvent)
router.get("/events/view", middleware.isLoggedIn,eventController.viewEvent)
router.put("/events/edit", upload.single('banner'), middleware.isLoggedIn,eventController.editEvent)
router.delete("/events/delete", middleware.isLoggedIn,eventController.deleteEvent)

// announcement routers 
router.post("/announcements/create", middleware.isLoggedIn,announcementController.storeAnnouncement)
router.get("/announcements/list", middleware.isLoggedIn,announcementController.listAnnouncement)
router.get("/announcements/view", middleware.isLoggedIn,announcementController.viewAnnouncement)
router.put("/announcements/edit", middleware.isLoggedIn,announcementController.editAnnouncement)
router.delete("/announcements/delete", middleware.isLoggedIn,announcementController.deleteAnnouncement)


module.exports = router; 