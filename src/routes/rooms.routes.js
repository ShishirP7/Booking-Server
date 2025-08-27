const router = require("express").Router();
const ctrl = require("../controllers/rooms.controller");

router.get("/", ctrl.listRooms);
router.get("/:id", ctrl.getRoom);
router.get("/:id/availability", ctrl.getAvailability);

module.exports = router;
