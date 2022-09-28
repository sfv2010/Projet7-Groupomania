const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        desc: { type: String, max: 300 },
        img: { type: String, default: "" },
        likes: { type: Array, default: [] },
        comment: { type: Array, default: [0] },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
