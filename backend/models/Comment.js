const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        desc: { type: String, max: 200 },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
