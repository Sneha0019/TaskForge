const express = require("express");
const router = express.Router();
const User = require("../models/User")
const {body, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
var fetchuser = require("../middleware/fetchuser")

const JWT_SECRET = "Snehaisagoodgir$l";

//-----Route1: create a User Using: POST "/api/auth/createUser". -----
router.post("/createuser",[
    //-----Requirements---
    body("name", "Enter name").isLength({min:3}),
    body("email", "Enter valid email").isEmail(),
    body("password", "password must be atleast 5 characters").isLength({min:5})
] ,async (req, res)=>{
    let success = false;
    //-----if errors then return bad request and the erross----
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success, errors: errors.array()});
    }

try{
    //----check whether user with same mail exist-----
let user = await User.findOne({email:req.body.email});

if(user){
    return res.status(400).json({success,error: "Sorry a user with email already exist"})
}
//----adding salt and hasing for passowrd----
const salt =await bcrypt.genSalt(10);
secPass = await bcrypt.hash(req.body.password, salt);

//-----create new user if not exist email-----
  user =  await User.create({
        name:req.body.name,
        email:req.body.email,
        password:secPass,     
    });
    const data = {
        user:{
            id:user.id
        }
    }
    const username = user.name
    const authToken = jwt.sign(data, JWT_SECRET);
    console.log(authToken)
    success = true;
    res.json({success,username, authToken});
}catch(error){
    console.error(error.message);
    res.status(500).send("some error occured");
}

    
   
})


//-----Route2: authentication a user using: "api/auth/login". No login required----
router.post("/login",[
    body("email", "Enter valid email").isEmail(),
    body("password", "password cannot be blank").exists(),
] ,async (req, res)=>{
    let success = false;
    //-----if there are errors, return bad request and the errors-----

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

//----extracting password and email that user added in login Pag-----
    const {email, password} = req.body;
    try {
        //-----authenticating the credential-----
        let user = await User.findOne({email});
        if(!user){
            success = false;
            return res.status(400).json({error: "please try to login with correct credentials"});
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            success=false;
            return res.status(400).json({success, error: "please try to login with correct credentials"});
        }

        const payload = {
            user:{
                id:user.id
            }
        }

        const username = user.name;

    const authToken = jwt.sign(payload, JWT_SECRET);
    success = true;
    res.json({success, username, authToken});

    }//----if any error occurs-----
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error occured");
    }

});


//----ROUTE 3: Get loggedin User Details: POST "/api/auth/getuser" ...Login required----
router.post("/getuser", fetchuser, async (req, res)=>{
    try {
        let userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        console.log(user);
        res.json({user});
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error occured");
    }
    

})





module.exports= router