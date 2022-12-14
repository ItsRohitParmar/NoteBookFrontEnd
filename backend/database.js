const mongoose = require('mongoose');
const URL = "mongodb://localhost:27017/iNoteBook";

const connectToMongo = ()=>{
    mongoose.connect(URL, ()=>{
        console.log("Connected to MongoDB Succussfully.");
    })
}

module.exports = connectToMongo; 