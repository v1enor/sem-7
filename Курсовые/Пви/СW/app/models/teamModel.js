const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    
        name: {
            type: String,
            required: true,
            default: 'Новая команда'
        },

        title: {
            type: String,
            default: 'Новая команда',
            required: true
        },
        description: {
            type: String,
            default: 'Описание команды',
            required: true
        },
        status: {
            type: String,
            default: 'active',
            required: true
        },
        userlist: {
            type: [String],
            required: true,
            ref: 'User'
        },
        manager: {
            type: [mongoose.Schema.Types.ObjectId],
            default: ['65759df332119eaaa8d91cf9'],
            required: true,
            ref: 'Manager'
        },
        });

module.exports = mongoose.model('Team', teamSchema);