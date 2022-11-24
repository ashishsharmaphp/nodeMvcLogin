const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const auth = require('../middlewares/auth');
const { response } = require('express');

async function login({ username, password }, callback) {
    const user = await User.findOne({ username });

    if (user.password!= null) {
        if (bcrypt.compareSync(password, user.password)) {
            const token = auth.generateAccessToken(username);
            return callback(null, ...user.toJSON(), token);
        } else {
            return callback({
                message: "Invalid Username/Password"
            });
        }
    } else {
        return callback({
            message: "Invalid Username/Password"
        });
    }
}


async function register(params, callback) {
    if (params.username === undefined) {
        return callback({ message: "Username required!!" });
    }

    const user = new User(params);
    user.save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((response) => {
            return callback(null, response);
        });
}

module.exports = {
    login,
    register
}