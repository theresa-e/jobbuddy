const mongoose = require('mongoose');
var user = mongoose.model('User');
var jobsController = require('./../controllers/jobs.js');

module.exports = function(app){
    // Process new user registration request
    app.post('/api/register', (req, res) => {
        jobsController.registerUser(req, res);
    });

    // Process existing user login request
    app.post('/api/login', (req, res) => {
        jobsController.loginUser(req, res);
    });

    // Process new job posting
    app.post('/api/jobs', (req, res) => {
        console.log(req.body)
        jobsController.createJob(req, res);
    });

    // Retrieve user info by ID
    app.get('/api/user/:id', (req, res) => {
        jobsController.findUserById(req, res);
    });

    // Retrieve all jobs
    app.get('/api/jobs', (req, res) => {
        jobsController.getAllJobs(req, res);
    });

    // User likes a job
    app.post('/api/jobs/:id', (req, res) => {
        jobsController.likeJob(req, res);
    });

    // Create study group
    app.post('/api/groups', (req, res) => {
        jobsController.createGroup(req, res);
    });

    // Retrieve all groups
    app.get('/api/groups', (req, res) => {
        jobsController.getAllGroups(req, res);
    });

    // Find group by ID 
    app.get('/api/groups/:id', (req, res) => {
        jobsController.findGroupById(req, res);
    })
    
    // Add user as attending study group
    app.post('/api/groups/:id', (req, res) => {
        console.log('-------- In the routes')
        jobsController.addAttendee(req, res);
    })
}