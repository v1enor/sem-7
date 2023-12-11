const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const string = mongoose.Schema.Types.String;

const taskSchema = new Schema({
    projectId: {
        type: String,
        ref: 'Project'
    },
    title: {
        type: string,
        default: 'Новая задача',
        required: true
    },
    status: {
        type: string,
        required: true,
        default: 'active'
    },
    description: {
        type: string,
        default: 'Описание задачи'
    },
    assignedTo: {
        type: string,
        ref: 'User',
        default: null
    },
});

module.exports = mongoose.model('Task', taskSchema);