const Comment = require("../models/Comment");
const User = require("../models/User");
const Post = require("../models/Post");

exports.createComment = async (req, res) => {
    console.log(req.body);
    const newComment = new Comment(req.body);
    const desc = req.body.desc;
    const post = await Post.findById(req.params.id); //id de post

    try {
        if (desc === null || desc === "" || desc === " ") {
            return res.status(400).json({ message: "Le commentaire doit contenir du texte" });
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
exports.deleteComment = async (req, res) => {
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
exports.getAllComment = async (req, res) => {
    try {
        const comment = await Comment.find();
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
