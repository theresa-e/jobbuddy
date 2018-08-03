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

/* ---------- Socket.io ---------- */
var io = require('socket.io').listen(server);

/* ---------- Routes ---------- */
require('./server/config/routes.js')(app)

// Catch all route
app.all("*", (req, res) => {
    console.log('Redirecting user back to public/index.');
    res.sendFile(path.resolve('./public/dist/public/index.html'));
})