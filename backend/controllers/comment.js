const Comment = require("../models/Comment");

exports.createComment = async (req, res) => {
    const newComment = new Comment(req.body);
    const desc = req.body.commentDesc;
    try {
        if (desc === null || desc === "" || desc === " ") {
            return res.status(400).json({ message: "Le message doit contenir du texte" });
        }
        const saveComment = await newComment.save();
        res.status(200).json(saveComment);
    } catch (err) {
        res.status(500).json(err);
    }
};
//---Moddifier un commentaire---

exports.updateComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        const desc = req.body.commentDesc;
        if (desc === null || desc === "" || desc === " ") {
            return res.status(400).json({ message: "Le message doit contenir du texte" });
        }
        if (
            comment.userId === req.body.userId ||
            comment.userId === req.auth.userId ||
            req.body.isAdmin === true ||
            req.auth.isAdmin === true
        ) {
            await comment.updateOne({
                $set: req.body,
            });
            res.status(200).json("Modifié avec succes");
        } else {
            res.status(403).json("Vous ne pouvez pas modifer les commentaores d'autres personne");
        }
    } catch (err) {
        res.status(403).json(err);
    }
};

//---Supprimer un commenaire---
exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (comment.userId === req.auth.userId || req.auth.isAdmin) {
            await comment.deleteOne();
            res.status(200).json("Supprimé avec succes");
        } else {
            res.status(403).json("Vous ne pouvez pas supprimer les commentes d'autres personne");
        }
    } catch (err) {
        res.status(403).json(err);
    }
};

exports.getAllCommentById = async (req, res) => {
    try {
        const comment = await Comment.find({ postId: req.query.postId });
        res.status(200).json(comment);
    } catch (err) {
        return res.status(404).json(err);
    }
};
exports.getOneComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        res.status(200).json(comment);
    } catch (err) {
        return res.status(404).json(err);
    }
};
