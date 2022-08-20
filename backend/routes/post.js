//const express = require("express");
const router = require("express").Router();
const postCtrl = require("../controllers/post");
const auth = require("../middleware/auth");

router.post("/", auth, postCtrl.createPost);
router.put("/:id", auth, postCtrl.updatePost);
router.delete("/:id", auth, postCtrl.deletePost);
router.get("/:id", auth, postCtrl.getOnePost);
router.post("/:id/like", auth, postCtrl.likerPost);

module.exports = router;
