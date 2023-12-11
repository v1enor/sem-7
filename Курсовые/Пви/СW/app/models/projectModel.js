const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid'); 

const projectSchema = new Schema({
            _id :{
                type: String,
                default: shortid.generate,
            },
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
                type: [String],
                required: true,
                default: ['XktfCip27'],
                ref: 'Team'
            },
});

module.exports = mongoose.model('Project', projectSchema);