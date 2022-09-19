const Comment = require("../models/Comment");
const User = require("../models/User");

exports.createComment = async (req, res) => {
    const newComment = new Comment(req.body);
    const desc = req.body.desc;
    console.log(req.body);

    try {
        if (desc == null || desc == "") {
            return res.status(400).json({ error: "Comment doit contenir du texte" });
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
