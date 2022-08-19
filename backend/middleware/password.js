const passwordSchema = require("../models/password");

module.exports = (req, res, next) => {
    if (passwordSchema.validate(req.body.password)) {
        next();
    } else {
        res.status(400).json({ message: "Le mots de passe est faible" });
    }
};
// module.exports = (req, res, next) => {
//     if (!passwordSchema.validate(req.body.password)) {
//       res.writeHead(
//         400,
//         "Le mot de passe doit contenir au moins 8 caractères dont un chiffre, une majuscule , une minuscule et sans espaces",
//         {
//           "content-type": "application/json",
//         }
//       );
//       res.end("Le format du mot de passe est incorrect.");
//     } else {
//       next();
//     }}
