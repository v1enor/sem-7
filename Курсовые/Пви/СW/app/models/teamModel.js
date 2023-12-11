const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid'); // библиотека для генерации коротких уникальных идентификаторов

const teamSchema = new Schema({
        _id :{
            type: String,
            default: shortid.generate,
        },
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
            type: [String],
            default: ['ilusha'],
            required: true,
            ref: 'Manager'
        },
    });
     
    module.exports = mongoose.model('Team', teamSchema);