const router = require("express").Router();
const commentCtrl = require("../controllers/comment");
const auth = require("../middleware/auth");
//const multer = require("../middleware/multer-config");

router.post("/:postId", auth, commentCtrl.createComment);
router.put("/:id", auth, commentCtrl.updateComment);
router.delete("/:id", auth, commentCtrl.deleteComment);
router.get("/", auth, commentCtrl.getAllComment);
router.get("/:id", auth, commentCtrl.getOneComment);

module.exports = router;
