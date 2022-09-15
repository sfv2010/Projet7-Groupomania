const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator"); //Les erreurs générées par défaut par MongoDB pouvant être difficiles à résoudre, nous installerons un package de validation pour prévalider les informations avant de les enregistrer :

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, min: 3, max: 20, unique: true },
        email: { type: String, required: true, min: 5, max: 30, unique: true }, // Pour s'assurer que deux utilisateurs ne puissent pas utiliser la même adresse e-mail, nous utiliserons le mot clé unique pour l'attribut email du schéma d'utilisateur userSchema
        password: { type: String, required: true, min: 8, max: 30 }, // hash est string
        profilePicture: { type: String, default: "" },
        coverPicture: { type: String, default: "" },
        followers: { type: Array, default: [] },
        followings: { type: Array, default: [] }, //suivantes
        isAdmin: { type: Boolean, default: false },
        desc: { type: String, max: 70 },
        city: { type: String, max: 50 },
    },
    { timestamps: true }
);

//---Plugin---
userSchema.plugin(uniqueValidator); //améliore les messages d'erreur lors de l'enregistrement de données uniques.

module.exports = mongoose.model("User", userSchema);
