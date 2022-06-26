const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId

const blogsSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim : true
    },
    body: {
        type: String,
        required: true,
        trim : true
    },
    authorId: {
        type: ObjectId,
        ref: "author",
        required: true,
        trim : true
    },
    tags: {
        type: [String],
        trim : true
    },
    category: {
        type: [String],
        required: true,
        trim : true
    },
    subcategory: {
        type: [String],
        trim : true
    },
    
    isDeleted: {
        type: Boolean,
        default: false
    },
    
    deletedAt:{
        type: String,
        default: "Date"
    },

    publishedAt:{
        type: String,
        default: "Date"
    },

    isPublished: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });


module.exports = mongoose.model('blogs', blogsSchema)
