const express = require('express');
const UserSchema = require('../models/UserSchema');
const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const router = express.Router();

router.post('/signup', async(req, res) => {
    try {
        const {user_name, user_email, user_password} = req.body;
        
        if(!user_name || !user_email || !user_password){
            throw new Error("Please fill all the fields");
        }

        let userExist = await UserSchema.findOne({user_email});
        if(userExist){
            return res.json({message: 'User already exists'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(user_password, salt);
        // consoel.log(hashedPass)

        const user = new UserSchema({
            user_name,
            user_email,
            user_password: hashedPass
        });

        await user.save();
        return res.json({message: 'User Creates Successfully'});


    } catch(err){
        return res.json({error: err});
    }
})

router.post('/login', async(req, res) => {
    try {
        const {user_email, user_password} = req.body;
    const user = await UserSchema.findOne({user_email: user_email});
    if(!user){
        return res.json({message: "Invalid credentials no"});
    }

    const isMatch = await bcrypt.compare(user_password, user.user_password);
    console.log(user_password, user.user_password);
    console.log(isMatch);
    if(!isMatch){
        return res.json({message: "Invalid credentials no"});
    }

    const token = jwt.sign({id: user._id}, process.env.JWT);

    return res.json({message: "Success", token: token, tag: true})
    } catch(err){
        return res.json({error: err.message});
    }
})

router.post('/auth', async(req, res) => {
    const token = req.body.token;
    try {
        const decoded = jwt.verify(token, process.env.JWT);
        const userId = decoded.id;

        return res.json({message: `Authenicated user: ${userId}`, tag: true})
    } catch(Err){
        return res.json({error: "Not authenicated"});
    }
})

router.post('/get_user_by_id', async(req,res) => {
    const id = req.body.id;
    let user = {};
    user = await UserSchema.findOne({_id: id});
    if(user){
        return res.json({
            message: user,
            tag: true
        })
    }

    return res.json({
        message: user,
        tag: false
    });
})


module.exports = router;