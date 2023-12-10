const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
        
            title: {
                type: String,
                required: true,
                default: 'Новый проект'
            },
            description: {
                type: String,
                required: true,
                default: 'Описание проекта'
            },
            status: {
                type: String,
                required: true,
                default: 'active'
            },
            teamlist: {
                type: [mongoose.Schema.Types.ObjectId],
                required: true,
                default: '65759df332119eaaa8d91cf9',
                ref: 'Team'
            },
});

module.exports = mongoose.model('Project', projectSchema);