const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");

router.put("/:id", auth, userCtrl.updateUser);
router.delete("/:id", auth, userCtrl.deleteUser);
router.get("/", auth, userCtrl.getAllUser);
router.get("/", auth, userCtrl.getOneUser);
router.put("/:id/follow", auth, userCtrl.followUser);
router.put("/:id/unfollow", auth, userCtrl.unFollowUser);

module.exports = router;
