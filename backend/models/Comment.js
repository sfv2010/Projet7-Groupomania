const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        commentDesc: { type: String, max: 200 },
        postId: { type: String, required: true },
        img: { type: String, default: "" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
