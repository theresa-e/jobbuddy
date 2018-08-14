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

    // Retrieve user info by ID
    app.get('/user/:id', (req, res) => {
        jobsController.findUserById(req, res);
    })

    // Retrieve all jobs
    app.get('/jobs', (req, res) => {
        jobsController.getAllJobs(req, res);
    })

    // User likes a job
    app.post('/jobs/:_id', (req, res) => {
        jobsController.likeJob(req, res);
    })
}