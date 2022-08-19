const bcrypt = require("bcrypt"); //pour le cryptage de mots de passe
const cryptoJs = require("crypto-js"); //pour le cryptage d'email
const jwt = require("jsonwebtoken"); //Nous utilisons la fonction sign de jsonwebtoken pour chiffrer un nouveau token.
const User = require("../models/User");
require("dotenv").config(); //importation de dotenv
const fs = require("fs");

//---Mettre à jour les informations de l'utilisateur---
exports.updateUser = async (req, res, next) => {
    if (req.auth.userId === req.params.id || req.body.isAdmin) {
        try {
            await User.findByIdAndUpdate(
                { _id: req.params.id },
                {
                    $set: req.body,
                }
            );
            res.status(200).json("Modifié!");
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("Vous n'êtes pas le propriétaire");
    }
};

//---supprimer l'utilisateur---
exports.deleteUser = async (req, res, next) => {
    if (req.body.userId !== req.auth.userId) {
        return res.status(401).json({ message: "Non-autorisé" });
    }
    if (req.auth.userId === req.params.id || req.body.isAdmin) {
        try {
            await User.findByIdAndDelete({ _id: req.params.id });
            res.status(200).json("Supprimé!");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        res.status(403).json("Vous n'êtes pas le propriétaire");
    }
};

// exports.getAllUser = (req, res, next) => {
//     User.find() //pas besoin d'argument,car ici on veut la liste complète de Sauce
//         .then((user) => res.status(200).json(user))
//         .catch((error) => res.status(400).json({ error }));
// };

//---obtenir les informations d'utilisateur avec son id---
exports.getOneUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);
    } catch (err) {
        res.status(404).json(err);
    }
};

//---Follow des utilisateurs---
exports.followUser = async (req, res, next) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById({ _id: req.params.id });
            const currentUser = await User.findById(req.body.userId);
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({ $push: { followings: req.params.id } });
                res.status(200).json("Suivi avec succès");
            } else {
                res.status(403).json("Vous suivez déjà cet utilisateur");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }
    return res.status(403).json("Vous ne pouvez pas suivre vous-même");
};

//---Supprimer follow---
exports.unFollowUser = async (req, res, next) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById({ _id: req.params.id });
            const currentUser = await User.findById(req.body.userId);
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { followings: req.params.id } });
                res.status(200).json("Supprimé avec succès");
            } else {
                res.status(403).json("Impossible de ne plus suivre cet utilisateur");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }
    return res.status(403).json("Vous ne pouvez pas supprimer vous-même");
};
