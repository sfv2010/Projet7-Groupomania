const passwordSchema = require("../models/password");

module.exports = (req, res, next) => {
    if (passwordSchema.validate(req.body.password)) {
        next();
    } else {
        res.status(400).json({
            message:
                "Le mot de passe doit contenir au moins 8 caractères dont un chiffre, une majuscule , une minuscule et sans espaces",
        });
    }
};
