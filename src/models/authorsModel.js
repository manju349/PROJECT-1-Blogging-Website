const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    title: {
        type: String,
        enum: ["Mr", "Mrs", "Miss"],
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validator: function(v){
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message : "Please Enter a Valid Email",

    },
    password: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('author', authorSchema)
