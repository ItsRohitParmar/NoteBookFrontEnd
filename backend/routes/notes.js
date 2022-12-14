const { response } = require('express');
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const notes = require('../models/notes');

const notes_collection = require('../models/notes');
const { collection } = require('../models/user');


//ROUTE 1: Get All Notes from database Path: api/notes/getAllNotes    Login Required  -------------------------------
router.get('/getAllNotes', fetchuser, async (req,res)=>{

    try {
        var note = await notes.find({user:req.user.id});
        res.status(200).json({note});
    } catch (error) {
        console.log(error.array());
        return res.status(401).send("Internal server error");
    }

})


//ROUTE 2: Create new note in Database path: api/notes/createNote    Login Required  -------------------------------

router.post('/createNote',[
    body('title',"Please enter the title").isLength({min:3}),
    body('description',"Please enter description").isLength({min:3})
], fetchuser, async (req,res)=>{
    const error = validationResult(req);
    if(!error.isEmpty())
    {
        return res.status(201).json({
            error:error.array()
        })
    }
    try {
        var note = await notes.create({
            user:req.user.id,
            title:req.body.title,
            description:req.body.description,
            tag: req.body.tag
        })
    } catch (error) {
        console.log(error);
        return res.status(401).send("Internal server error");
    }
    res.status(200).json({note});

})


//ROUTE 3: Update Note in Database path: api/notes/updateNote    Login Required  -------------------------------

router.put('/updateNote/:id', [
    body('title',"Title length should be atleat 3 character").isLength({min:3}),
    body('description',"Description length must be atleat 3 character").isLength({min:3})
], fetchuser , async (req,res)=>{

    var error = validationResult(req);
    if(!error.isEmpty())
    {
        return res.status(201).json({error : error.array()});
    }

    try {

        const existing_note = await notes_collection.findById({_id:req.params.id})

        if(!existing_note){
            return res.status(404).send("This note does not exits");
        }

        // console.log("Existing user type = "+ typeof existing_note.user + "url user type = "+ typeof req.user.id);
        
        if(!(existing_note.user.toString() === req.user.id))
        {
            return res.status(400).json("You are not authorized to update this note");
        }
        
        var data = new notes_collection({
            title:req.body.title,
            description:req.body.description,
            tag:req.body.tag
        }
        )

        var Id = req.params.id;
        const updatedNote = await notes_collection.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            context: 'query'
           })
        
        res.status(200).send(updatedNote);
        // res.status(202).json({
        //     Success: true,
        //     note: updatedNote 
        // })

    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
    })

//ROUTE 4: Update Note in Database path: api/notes/deleteNote    Login Required  -------------------------------
router.delete('/deleteNote/:id', fetchuser, async(req, res)=>{
    if(!req.params.id)
    {
       return res.status(401).json({success:false, message:"Please select a note"});
    }

    var existing_note = await notes_collection.findById(req.params.id);

    if(!existing_note)
    {
       return res.status(404).json({success:false, message:"This node does not exists"});
    }

    if(!(existing_note.user.toString()===req.user.id))
    {
        return res.status(400).json({success:false, message:"User is not authorized to delete this record"})
    }

    var id = req.params.id;

    const deleted = await notes_collection.findByIdAndDelete(id);

        if(!deleted)
        {
           return res.status(401).json({error:err});
        }
        else{
            res.status(200).json({success:true, message:"Note is deleted succesfully"});
        }
    })

module.exports = router;
