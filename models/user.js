const mongoose = require('mongoose');

const User = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        minlength: 6,
    }
}) 