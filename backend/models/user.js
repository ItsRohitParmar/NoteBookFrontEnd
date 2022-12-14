const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const user_schema = new Schema({
    name:{
        type:String,
        require: true,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        default:Date.now
    },
});

const user_collection = mongoose.model('User',user_schema);
// user_collection.createIndexes();
module.exports = user_collection;