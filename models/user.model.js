const mongoose = require('mongoose');
const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    contact: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profileImg: {
        type: String
    },
    emailVerify: {
        type: String,
        default: 'N'
    },
    contactVerify: {
        type: String,
        default: 'N'
    },
    active: {
        type: String,
        default: 'N'
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.password;
    }
});

userSchema.plugin(uniqueValidator, {message: "Email already exists!!"});

const User = mongoose.model("user",userSchema);

module.exports = User;