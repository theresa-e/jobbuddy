const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/jobs');

var MessageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    content: {
        type: String,
    }
}, {
    timestamps: true
});

var JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required."],
        minlength: [3, "Title must be at least 3 characters long."]
    },
    description: {
        type: String,
        required: [true, "Description is required."],
        minlength: [3, "Description must be at least 3 characters long."]
    },
    url: {
        type: String,
        required: [true, "URL is required."],
        minlength: [10, "URL length must be at least 10 characters long."]
    },
    perks: {
        type: String,
    },
    totalLikes: 0,
})

var StudyGroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Study group must have a name."]
    },
    date: {
        type: String,
        required: [true, "Please enter a date."]
    },
    location: {
        type: String,
        required: [true, "Please enter a location."]
    },
    time: {
        type: String,
        required: [true, "Please enter a meeting time."]
    },
    description: {
        type: String,
        required: [true, "Enter a brief description of the topic of this study group."]
    }, 
    created_by: {
        type: Object
    }, 
    attendees: {
        type: [UserSchema]
    }
}, {
    timestamps: true
})

var UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please enter a first name."],
        minlength: [3, "First name must be at least 3 characters long."]
    },
    lastName: {
        type: String,
        required: [true, "Please enter a last name."],
        minlength: [3, "Last name must be at least 3 characters long."]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please enter an email."],
        minlength: [3, "Email address must be at least 3 characters in length."]
    },
    password: {
        type: String,
        required: [true, "Password is required."],
        minlength: [8, "Password must be at least 8 characters in length."]
    },
    posted_jobs: {
        type: [JobSchema]
    },
    likes: [JobSchema]
}, {
    timestamps: true
});

mongoose.model('User', UserSchema);
mongoose.model('Job', JobSchema);
mongoose.model('Message', MessageSchema);
mongoose.model('Group', StudyGroupSchema);