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

const createUser = require('../controller/userController');




// ROUTE 1: create a new user (No login required) ----------------------------------------------------------------------------------------
const user_collection = require('../models/user');


router.post('/createuser', [
    body('name', 'Enter name of min length 3').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password length must be atleast 5 charactors').isLength({ min: 5 }),
], async (req, res) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() })
    }

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
        res.json({
            success:true,
            auth_token:auth_token});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"});
    }
})





//ROUTE 2: Authenticat a user (login) no login required ------------------------------------------------------------------------------------------------
router.post('/login', [
    body('email', 'Please enter a valid email').isEmail(),
    body('password', 'Please enter password').exists()
], async (req, res) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({
            success:false,
            error: error.array()
        })
    }

    try {
        //fatching the user details from DB
        let user = await user_collection.findOne({ email: `${req.body.email}` });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Please enter correct credentials"
            })
        }

        //converting the password entered by user into hash code and matching with database password.
        var compaire_Pass = bcrypt.compareSync(req.body.password, user.password);

        //if password did not match
        if (!compaire_Pass) {
            return res.status(404).json({
                success:false,
                message: 'Please enter the correct credentials',
            })
        }

        //Payload data for authentication token
        var data = {
            user: {
                id: user.id
            }
        }
        //encrypting and Signing the payload data with jwt_secret 
        var auth_token = jwt.sign(data, JWT_SECRET);

        // console.log(auth_token);
        res.status(200).json({
            success:true,
            auth_token: auth_token
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json("Internal Server Error");
    }
})



//ROUTE 3: POST Request: To Get User Data
router.post('/getuser', fetchuser, async (req, res) => {

    try {
        const user = await user_collection.findById(req.user.id).select("-password");
        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router;
