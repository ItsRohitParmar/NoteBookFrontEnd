const express = require("express");
var jwt = require('jsonwebtoken');
const user_collection = require('../models/user')

const JWT_SECRET = "Rohitisadeveloper";

const fetchuser = (req, res, next) => {
    const auth_token = req.header('auth_token');
    if(!auth_token)
        {
            return res.status(401).json({error: "Please authenticat using valid token"})
        }

    try {
        var data = jwt.verify(auth_token, JWT_SECRET);
        var user = data.user;
        req.user = user;
        next();

    } catch (error) {
        res.status(401).send({error: "Please authenticat using valid token"})
    }
}

module.exports = fetchuser;