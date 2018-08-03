const mongoose = require('mongoose');
var user = mongoose.model('User');
var jobsController = require('./../controllers/jobs.js');

module.exports = function(app){
    // Process new user registration request
    app.post('/register', (req, res) => {
        jobsController.registerUser(req, res);
    });

    // Process existing user login request
    app.post('/login', (req, res) => {
        jobsController.loginUser(req, res);
    });

    // Process new job posting
    app.post('/jobs', (req, res) => {
        console.log(req.body)
        jobsController.createJob(req, res);
    });

    // Retrieve all jobs
    app.get('/jobs', (req, res) => {
        jobsController.getAllJobs(req, res);
    })
}