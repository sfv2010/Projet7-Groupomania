const Post = require("../models/Post");
const User = require("../models/User");

//---Créer un poste--
exports.createPost = async (req, res) => {
    const newPost = new Post(req.body);
    const desc = req.body.desc;

    try {
        if (desc === null || desc === "" || desc === " ") {
            return res.status(400).json({ message: "Le message doit contenir du texte" });
        }
        const savePost = await newPost.save();
        res.status(200).json(savePost);
    } catch (err) {
        res.status(500).json(err);
    }
};

//---Modifier un poste---
exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id); //id de post
        const desc = req.body.desc;
        // console.log("req.auth", req.auth);
        // console.log("req.body", req.body);
        if (desc === null || desc === "" || desc === " ") {
            return res.status(400).json({ message: "Le message doit contenir du texte" });
        }
        //si userId = userId qui est propriétaire de post
        if (
            post.userId === req.body.userId ||
            post.userId === req.auth.userId ||
            req.body.isAdmin === true ||
            req.auth.isAdmin === true
        ) {
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

exports.deletePost = async (req, res) => {
    try {
        // console.log("req.auth", req.auth);
        // console.log("req", req.body);
        const post = await Post.findById(req.params.id);
        if (post.userId === req.auth.userId || req.auth.isAdmin === true) {
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
        if (!post.likes.includes(req.auth.userId)) {
            await post.updateOne({ $push: { likes: req.auth.userId } });
            res.status(200).json("Liké avec succès");
        } else {
            // s'il est déjà liké,on le enléve
            await post.updateOne({ $pull: { likes: req.auth.userId } });
            res.status(200).json("Vous avez enlever un like");
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

//---Obtenir les postes suivis---
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
//---Obtenir les postes de profile---

exports.profilePost = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        const posts = await Post.find({ userId: user._id });

        return res.status(200).json(posts);
    } catch (err) {
        return res.status(500).json(err);
    }
};

//---Comentaire----

exports.createCommentPost = async (req, res) => {
    console.log(req.body);

    // const desc = req.body.commentDesc;
    //const { desc, userId } = req.body;

    try {
        // if (desc === null || desc === "" || desc === " ") {
        //     return res.status(400).json({ message: "Le commentaire doit contenir du texte" });
        // }

        const post = await Post.findById(req.params.id); //id de post
        await post.updateOne({
            $set: req.body,
        });

        res.status(200).json("commenté avec succès");
    } catch (err) {
        res.status(500).json(err);
    }
};
//---Moddifier un commentaire---
exports.updateCommentPost = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (comment.userId === req.body.userId || req.body.isAdmin) {
            await comment.updateOne({
                $set: req.body,
            });
            res.status(200).json("Modifié avec succes");
        } else {
            res.status(403).json("Vous ne pouvez pas modifer les commentes d'autres personne");
        }
    } catch (err) {
        res.status(403).json(err);
    }
};

//---Supprimer un commenaire---
exports.deleteCommentPost = async (req, res) => {
    try {
        const comment = await comment.findById(req.params.id);
        if (comment.userId === req.body.userId || req.body.isAdmin) {
            await comment.deleteOne();
            res.status(200).json("Supprimé avec succes");
        } else {
            res.status(403).json("Vous ne pouvez pas supprimer les commentes d'autres personne");
        }
    } catch (err) {
        res.status(403).json(err);
    }
};
