const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");

router.put("/:id", auth, userCtrl.updateUser);
router.delete("/:id", auth, userCtrl.deleteUser);
//router.get("/", userCtrl.getAllUser);
router.get("/:id", auth, userCtrl.getOneUser);
router.put("/:id/follow", userCtrl.followUser);

module.exports = router;
