const router = require("express").Router();
const ctrl = require("../controllers/posts.controller");

router.get("/", ctrl.listPosts);
router.post("/", ctrl.createPost);
router.delete("/:id", ctrl.deletePost);

module.exports = router;
