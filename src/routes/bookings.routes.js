const router = require("express").Router();
const ctrl = require("../controllers/bookings.controller");

router.get("/", ctrl.listBookings);
router.post("/", ctrl.createBooking);
router.delete("/:id", ctrl.cancelBooking);

module.exports = router;
