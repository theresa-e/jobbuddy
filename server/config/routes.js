const mongoose = require('mongoose');
var user = mongoose.model('User');
var jobsController = require('./../controllers/jobs.js');

module.exports = function(app){
    // Process new user registration request
    app.post('/register', (req, res) => {
        jobsController.registerUser(req, res);
    })

    // Process existing user login request
    app.post('/login', (req, res) => {
        jobsController.loginUser(req, res);
    })
}