const mongoose = require('mongoose');
require('../models/user.js');
var User = mongoose.model('User');
var bcrypt = require('bcryptjs');

module.exports = {
    // Process new user registration form 
    registerUser: (req, res) => {
        bcrypt.hash(req.body.password, 10, function (err, hash) { // hash user's password
            var user = new User({
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: hash,
            });
            console.log('------ REQ.BODY: ', req.body)
            user.save(function (err) {
                if (err) {
                    console.log('------ Error: Could not save user.');
                    res.json({
                        message: "Error",
                        error: err
                    })
                } else {
                    console.log('------ Success: New user was saved to database.');
                    res.json({
                        message: "Success",
                        new_user: user
                    })
                }
            })
        })
    },

    // Process login form
    loginUser: (req, res) => {
        console.log('------ User tried to login')
        User.findOne({
            email: req.body.email
        }, (err, user) => { // Check if email is tied to an account.
            if (!user) {
                console.log('------ Error: Could not find email in the database.');
                res.json({
                    message: "Error", 
                    error_msg: "Email and/or password is invalid."
                })
            } else {
                console.log('------ Success: Found account associated with email address.');
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (result) {
                        console.log('------ Passwords match!');
                        res.json({
                            message: "Success",
                            result: result
                        })
                    } else {
                        console.log('------ Passwords do not match!');
                        res.json({
                            message: "Error",
                            error: err
                        })
                    }
                })
            }
        })
    }
}