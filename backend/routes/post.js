const router = require("express").Router();
const postCtrl = require("../controllers/post");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/", auth, multer, postCtrl.createPost);
router.put("/:id", auth, multer, postCtrl.updatePost);
router.delete("/:id", auth, multer, postCtrl.deletePost);
router.get("/", auth, postCtrl.getAllPost);
router.get("/:id", auth, postCtrl.getOnePost);
router.post("/:id/like", auth, postCtrl.likerPost);
router.get("/timeline/:userId", auth, postCtrl.timelinePost);
router.get("/timeline/:username", auth, postCtrl.timelinePost);

module.exports = router;
