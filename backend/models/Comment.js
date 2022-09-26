const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        desc: { type: String, max: 200 },
        postId: { type: String, required: true },
        commentId: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
