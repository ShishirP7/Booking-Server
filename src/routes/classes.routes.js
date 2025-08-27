const router = require("express").Router();
const ctrl = require("../controllers/classes.controller");

router.get("/", ctrl.listClasses);
router.get("/:id", ctrl.getClass);
router.get("/:id/availability", ctrl.getAvailability);

module.exports = router;
