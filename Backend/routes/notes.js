const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes")
var fetchuser = require("../middleware/fetchuser")
const {body, validationResult} = require("express-validator");

//ROUTE 1: Get All the Notes using: "api/notes/fetchallnotes".Login Required
router.get("/fetchallnotes",fetchuser , async(req, res)=>{
    try{
   const notes = await Notes.find({user : req.user.id})
    res.json(notes)
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }
});


//ROUTE 2: Add a New Notes using: POST "api/notes/addnote.Login Required
router.post("/addnote",fetchuser, [
    body("title", "Enter valid title").isLength({min:3}),
    body("description", "desccription must be atleast 5 characters").isLength({min:5})
] , async(req, res)=>{
    try{
    const {title, description, tag} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const note = await new Notes({
        title, description, tag, user: req.user.id

    })

    const savedNote = await note.save();
    res.json(savedNote)

}catch(error){

    console.error(error.message);
    res.status(500).send("Internal server error occured");
}

 });


 //ROUTE 3: Update note of an existing note using: PUT "api/notes/update noe.Login Required
router.put("/updatenote/:id",fetchuser, async(req, res)=>{
    try{
    const {title, description, tag} = req.body;
    console.log(title)
    //create a newnOte object
    const NewNote  = {};
    if(title) {NewNote.title = title};
    if(description){NewNote.description = description};
    if(tag){NewNote.tag = tag};

    //find the note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if(!note) {return res.status(404).send("Not found")};

    if(note.user.toString()!=req.user.id){
        return res.status(401).send("Not allowed");;
    }

    note = await Notes.findByIdAndUpdate(req.params.id, {$set: NewNote}, {new:true})
    console.log(note)
    res.json({note});


    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

}catch(error){

    console.error(error.message);
    res.status(500).send("Internal server error occured");
}

 });


  //ROUTE 4: Delete note of an existing note using: DELETE "api/notes/deletenote Login Required
router.delete("/deletenote/:id",fetchuser, async(req, res)=>{
    try{
    //-----find the note to be felted and delete it-----
    let note = await Notes.findById(req.params.id);
    if(!note) {return res.status(404).send("Not found")};

    //----Allow deletion only if user owns this note----
    if(note.user.toString()!=req.user.id){
        return res.status(401).send("Not allowed");;
    }

    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({"success": "Note has been deleted", note:note});


    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

}catch(error){

    console.error(error.message);
    res.status(500).send("Internal server error occured");
}

 });

module.exports= router