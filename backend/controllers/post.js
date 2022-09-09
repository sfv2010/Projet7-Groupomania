const Post = require("../models/Post");
const User = require("../models/User");

//---Créer un poste--
exports.createPost = async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savePost = await newPost.save();
        res.status(200).json(savePost);
    } catch (err) {
        res.status(500).json(err);
    }
};

//---Modifier un poste---
exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId || req.body.isAdmin) {
            await post.updateOne({
                $set: req.body,
            });
            res.status(200).json("Modifié avec succes");
        } else {
            res.status(403).json("Vous ne pouvez pas modifer les postes d'autres personne");
        }
    } catch (err) {
        res.status(403).json(err);
    }
};

//---Supprimer un poste---
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId || req.body.isAdmin) {
            await post.deleteOne();
            res.status(200).json("Supprimé avec succes");
        } else {
            res.status(403).json("Vous ne pouvez pas supprimer les postes d'autres personne");
        }
    } catch (err) {
        res.status(403).json(err);
    }
};

//---obtenir les informations de tous les postes---
exports.getAllPost = async (req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post);
    } catch (err) {
        return res.status(404).json(err);
    }
};

//---obtenir les informations d'un poste avec son ObjectId---
exports.getOnePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        return res.status(404).json(err);
    }
};

//---liker pour un poste---
exports.likerPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        //Si le post n'a pas encore été liké
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("Liké avec succès");
        } else {
            // s'il est déjà liké,on le enléve
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("Vous avez enlever un like");
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

//---Obtenir les postes de la chronologie---
exports.timelinePost = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        const followPosts = await Promise.all(
            currentUser.followings.map((followId) => {
                return Post.find({ userId: followId });
            })
        );
        return res.status(200).json(userPosts.concat(...followPosts));
    } catch (err) {
        return res.status(500).json(err);
    }
};
