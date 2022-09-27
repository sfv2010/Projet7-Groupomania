const router = require("express").Router();
const postCtrl = require("../controllers/post");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/", auth, multer, postCtrl.createPost);
router.put("/:id", auth, multer, postCtrl.updatePost);
router.delete("/:id", auth, multer, postCtrl.deletePost);
router.get("/", auth, postCtrl.getAllPost);
router.get("/:id", auth, postCtrl.getOnePost);
router.put("/:id/like", auth, postCtrl.likerPost);
router.get("/profile/:username", auth, postCtrl.profilePost);
router.get("/timeline/:userId", auth, postCtrl.timelinePost);
// router.post("/:id/comments", auth, postCtrl.createCommentPost);
// router.patch("/:id/comments/:commentId", auth, postCtrl.updateCommentPost);
// router.patch("/:id/comments/:commentId", auth, postCtrl.deleteCommentPost);

module.exports = router;
