//PART 1---------------------------------------------------------------------------------------------- 
//importing database.js to connect with MongoDB
const connectToMongo = require('./database');
// calling function inside of database.js
connectToMongo();

// PART 2 --------------------------------------------------------------------------------------------
//importing express to create server 
const express = require('express');

const cors = require('cors');

//creating app variable function.
const app = express();
const PORT = 5000;

// starting server
app.listen(PORT, () => {
    console.log("Example app is listening at http://localhost:5000");
})


app.use(cors())
// middle ware to get req body data
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Rohit is on fire....!");
})

// ----------------------------------------------------------------------------------------------------
// Availble 2 routes 
const notesroutes = require('./routes/notes');
const authentication = require('./routes/auth');

//redirecting to routes
app.use('/api/notes', notesroutes);
app.use('/api/auth', authentication);