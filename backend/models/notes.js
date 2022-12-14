const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const note_schema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String,
        require:true,
    },
    description:{
        type: String,
        require:true
    },
    tag:{
        type:String,
        default:"General"
    },
    date:{
        type: Date,
        default: Date.now
    }
})

const notes_collection = mongoose.model('Note',note_schema);
module.exports = notes_collection;