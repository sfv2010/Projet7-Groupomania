const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator"); //Les erreurs générées par défaut par MongoDB pouvant être difficiles à résoudre, nous installerons un package de validation pour prévalider les informations avant de les enregistrer :

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true }, // Pour s'assurer que deux utilisateurs ne puissent pas utiliser la même adresse e-mail, nous utiliserons le mot clé unique pour l'attribut email du schéma d'utilisateur userSchema
    password: { type: String, required: true }, // hash est string
});

//---Plugin---
userSchema.plugin(uniqueValidator); //améliore les messages d'erreur lors de l'enregistrement de données uniques.

module.exports = mongoose.model("User", userSchema);
