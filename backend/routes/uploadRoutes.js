const express = require("express");
const path = require("path");
const User = require("../models/User");
const { verifyToken } = require("../utils/verifyToken.js");
const router = express.Router();
const upload = require("../utils/multerSetup.js")

// Routes
router.post("/", verifyToken, upload.single('image'), async (req, res) => {
    try{
        console.log(req.body);
        const user = await User.findById(req.user.id)
        const new_user = await User.findByIdAndUpdate(req.user.id, {username: req.body.username, address: req.body.address, phone_no: req.body.phone}, {new: true});
        if(req.body.image != 'undefined'){
            user.image = req.file.filename;
            const result = await user.save()
        }
         
        res.status(200).send({success:true, message: "user data updated successfully"})
    }
    catch(err){
        res.send({success: false, message: 'could not update user data'})
    }

  
})



module.exports = router;
