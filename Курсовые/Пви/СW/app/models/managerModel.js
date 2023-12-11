const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const string = mongoose.Schema.Types.String;

const managerSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: string,
        required: true,
        default: 'active'
    },
    description: {
        type: string,
       
    },
    projects: {
        type: [String],
        ref: 'project'
    },

});

module.exports = mongoose.model('Manager', managerSchema);