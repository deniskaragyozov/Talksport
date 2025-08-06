const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    likes: [{
        type: ObjectId,
        ref: "User"
    }],
    userId: {
        type: ObjectId,
        ref: "User"
    },

}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Article', articleSchema);