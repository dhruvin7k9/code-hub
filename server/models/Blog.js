const mongoose = require('mongoose')
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    tags: [],
    upvote: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    downvote: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    view: {
        type: Number,
        default: 0
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

module.exports = mongoose.model('Blog', blogSchema);