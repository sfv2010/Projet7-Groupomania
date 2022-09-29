const router = require("express").Router();
const commentCtrl = require("../controllers/comment");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/:postId", auth, multer, commentCtrl.createComment);
router.put("/:id", auth, multer, commentCtrl.updateComment);
router.delete("/:id", auth, multer, commentCtrl.deleteComment);
router.get("/", auth, commentCtrl.getAllCommentById);
router.get("/:id", auth, commentCtrl.getOneComment);

module.exports = router;
