const express = require('express');

//Express router
const router = express.Router();

//Express validator for min,max length validation
const { body, validationResult } = require('express-validator');

//one way incription of password using bcryptjs
var bcrypt = require('bcryptjs');

//importing JSON Web Token to create auth token
var jwt = require('jsonwebtoken');

const JWT_SECRET = "Rohitisadeveloper";

//importing middleware to use fetchuser.js
const fetchuser = require("../middleware/fetchuser");




// ROUTE 1: create a new user (No login required) ----------------------------------------------------------------------------------------
const user_collection = require('../models/user');

exports.createUser = async (req, res) => {

    // const error = validationResult(req);
    // if (!error.isEmpty()) {
    //     return res.status(400).json({ error: error.array() })
    // }

    //Destructuring
    const { name, email, password } = req.body;

    try {
        const check_user = await user_collection.findOne({ email: `${email}` });
        if (check_user)
            return res.status(200).send({
                success: false,
                message: "This email is already registered",
            });


        // This is to make password encrypted.
        var salt = bcrypt.genSaltSync(10);
        var pass_hash = bcrypt.hashSync(req.body.password, salt);

        var user = await user_collection.create({
            name: req.body.name,
            password: pass_hash,
            email: req.body.email,
        });

        //Payload data for authentication token
        var data = {
            user: {
                id: user.id
            }
        }
        //encrypting and Signing the payload data with jwt_secret 
        var auth_token = jwt.sign(data, JWT_SECRET);
        console.log(auth_token);
        res.json({auth_token:auth_token});
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Server Error");
    }
}
