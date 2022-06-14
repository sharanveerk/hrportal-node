const router = require("express").Router();
const middleware = require("../middleware/auth")
const eventTypeController = require("../controllers/event/event_type.controller");
const eventController = require("../controllers/event/event.controller");

// event type routes
router.post("/event_type/create", middleware.isLoggedIn,eventTypeController.storeEventType)
router.get("/event_type/view", middleware.isLoggedIn,eventTypeController.viewById)
router.get("/event_type/list", middleware.isLoggedIn,eventTypeController.eventTypeList)
router.put("/event_type/edit", middleware.isLoggedIn,eventTypeController.editTypeList)

// event routes
router.post("/events/create", middleware.isLoggedIn,eventController.storeEvent)

module.exports = router; 