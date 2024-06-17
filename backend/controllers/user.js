const User = require("../models/User");

//---Mettre à jour les informations de l'utilisateur---
exports.updateUser = async (req, res) => {
    if (req.auth.userId === req.params.id || req.body.isAdmin) {
        try {
            await User.findByIdAndUpdate(
                { _id: req.params.id },
                {
                    $set: req.body,
                } //tout les parametre de user models.
            );
            res.status(200).json("Modifié!");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("Vous n'êtes pas le propriétaire");
    }
};

//---supprimer l'utilisateur---
exports.deleteUser = async (req, res) => {
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
        return res.status(403).json("Vous n'êtes pas le propriétaire");
    }
};

//---obtenir les informations d'utilisateur avec query---
exports.getOneUser = async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
        const user = userId
            ? await User.findById(userId)
            : await User.findOne({ username: username });
        const { password, updatedAt, followings, followers, ...other } = user._doc;
        return res.status(200).json(other);
    } catch (err) {
        return res.status(404).json(err);
    }
};

// exports.getAllUser = (req, res, next) => {
//     User.find() //pas besoin d'argument,car ici on veut la liste complète de Sauce
//         .then((user) => res.status(200).json(user))
//         .catch((error) => res.status(400).json({ error }));
// };

// //---Follow des utilisateurs---
// exports.followUser = async (req, res) => {
//     if (req.body.userId !== req.params.id) {
//         try {
//             const user = await User.findById(req.params.id);
//             const currentUser = await User.findById(req.body.userId);
//             //S'il n'existe pas dans un followers, on peut suivre フォロワーにいなかったらフォローできる
//             if (!user.followers.includes(req.body.userId)) {
//                 await user.updateOne({ $push: { followers: req.body.userId } });
//                 await currentUser.updateOne({ $push: { followings: req.params.id } });
//                 res.status(200).json("Suivi avec succès");
//             } else {
//                 return res.status(403).json("Vous suivez déjà cet utilisateur");
//             }
//         } catch (err) {
//             return res.status(500).json(err);
//         }
//     } else {
//         return res.status(500).json("Vous ne pouvez pas suivre vous-même");
//     }
// };

// //---Supprimer follow---
// exports.unFollowUser = async (req, res) => {
//     if (req.body.userId !== req.params.id) {
//         try {
//             const user = await User.findById(req.params.id);
//             const currentUser = await User.findById(req.body.userId);
//             //S'il existe dans un followers,on peut les enlever フォロワーにいたらフォロー外せる
//             if (user.followers.includes(req.body.userId)) {
//                 await user.updateOne({ $pull: { followers: req.body.userId } });
//                 await currentUser.updateOne({ $pull: { followings: req.params.id } });
//                 res.status(200).json("Supprimé avec succès");
//             } else {
//                 return res.status(403).json("Impossible de ne plus suivre cet utilisateur");
//             }
//         } catch (err) {
//             return res.status(500).json(err);
//         }
//     } else {
//         return res.status(500).json("Vous ne pouvez pas supprimer vous-même");
//     }
// };
