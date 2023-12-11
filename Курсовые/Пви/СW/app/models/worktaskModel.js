const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const string = mongoose.Schema.Types.String;

const worktaskSchema = new Schema({
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
});

module.exports = mongoose.model('Worktask', worktaskSchema);