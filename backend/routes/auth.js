//---Importation---
const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/auth");
const password = require("../middleware/password");
const validateEmail = require("../middleware/validateEmail");

//---L’express-rate-limit est le package npm pour limiter la demande de l’utilisateur---
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 4, // limiter même IP du 4 requests par windowMs
    message: "Trop de requêtes de cette IP",
});

//---Router---
router.post("/signup", password, validateEmail, authCtrl.signup);
router.post("/login", limiter, authCtrl.login);
router.post("/logout", authCtrl.logout);

//---Exportation---
module.exports = router;
