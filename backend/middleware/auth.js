//---importation---
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
    try {
        //---Récupération le token dans le header, second élément du tableau.Le premier contien le mot "Bearer". La fonction split pour récupérer après l'espace---
        const token = req.headers.authorization.split(" ")[1];
        //---fonction verify pour décoder et vérifier notre token---
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        //---Récupération de l'userId et isAdmin de notre token (décodé)---
        const userId = decodedToken.userId;
        const isAdmin = decodedToken.isAdmin;
        //---attribuer l'objet userId et isAdmin de notre token à l’objet Request afin que nos différentes routes puissent l’exploiter
        req.auth = {
            userId: userId,
            isAdmin: isAdmin,
        };
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error });
    }
};
