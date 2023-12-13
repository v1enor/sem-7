const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventsSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        default: "Название события",
        required: true
    },
    projectid: {
        type: String,
        default: "",
        ref: 'Project'
    },
    teamid: {
        type: String,
        default: "",
        ref: 'Team'
    },
    startTime: {
        type: Date,
        default: Date.now,
        required: true
    },
    endTime: {
        type: Date,
        default: Date.now,
        required: true
    },
});

module.exports = mongoose.model('Event', eventsSchema);