var path = require("path")

/* ---------- Express ---------- */
const express = require('express');
const app = express();
const server = app.listen(7000);
console.log("Running at port 7000...");

/* ---------- Body Parser ---------- */
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // Configure to read JSON data
app.use(bodyParser.urlencoded({
    extended: true
}));

/* ---------- Bcrypt ---------- */
const bcrypt = require('bcryptjs');

/* ---------- Static ---------- */
app.use(express.static(__dirname + '/public/dist/public'));

/* ---------- Mongoose ---------- */
require('./server/models/user.js')
const mongoose = require('mongoose');
var Message = mongoose.model('Message');

/* ---------- Socket.io ---------- */

const io = require('socket.io')(server);
const usersLoggedIn = [];
var userInfo = {}


io.on('connection', (socket) => {
    // Send users activeUsers list when they log on.
    console.log('---- User Connected');
    io.emit('activeUsers', usersLoggedIn);

    // Send them all the existing messages from the db.
    Message.find({}, (err, allMsgs) => {
        if (err) {
            console.log('------ Error: Could not retrieve all messages.');
        } else {
            console.log('------- Success: Retrieved all messages!');
            console.log(allMsgs);
            io.emit('messages', allMsgs);
        }
    })

    // Add user to activeUsers when they open chatroom.
    socket.on('userInfo', (user) => {
        usersLoggedIn.push(user);
        console.log('Users that are loggedin: ', usersLoggedIn);
        userInfo = user;
        socket.emit('activeUsers', usersLoggedIn);
        socket.broadcast.emit('activeUsers', usersLoggedIn);
    })

    // Save each new message to the db.
    socket.on('chat message', (msg) => {
        var newMsg = new Message({
            name: msg.name,
            content: msg.content
        });
        newMsg.save((err) => {
            if (err) {
                console.log('------ Could not save new message.');
            } else {
                console.log('------ Saved new message.');
                Message.find({}, (err, allMsgs) => {
                    if (err) {
                        console.log('------ Error: Could not retrieve all messages.');
                    } else {
                        console.log('------- Success: Retrieved all messages!');
                        console.log(allMsgs);
                        io.emit('messages', allMsgs);
                    }
                })
            }
        })
    });
    // Remove user from active list when they disconnect. 
    socket.on('disconnect', () => {
        for (var i = 0; i < usersLoggedIn.length; i++) {
            console.log(userInfo)
            if (usersLoggedIn[i]._id === userInfo._id) {
                usersLoggedIn.splice(i, 1);
                socket.broadcast.emit('activeUsers', usersLoggedIn);
            }
        }
    });
});

/* ---------- Routes ---------- */
require('./server/config/routes.js')(app)

// Catch all route
app.all("*", (req, res) => {
    console.log('Redirecting user back to public/index.');
    res.sendFile(path.resolve('./public/dist/public/index.html'));
})